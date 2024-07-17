/**
 |===============================================================
 | Provider
 |===============================================================
 |
 | Providers are crucial for offering functionalities such as
 | database access or API calls. They ensure modular, testable
 | code by effectively handling dependencies. Each Provider must
 | be imported in its own @Module
 |
 | @ReadMore https://docs.nestjs.com/providers
 |
 |===============================================================
 */

import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { User } from "src/models/users/user/user.entity";
import { CreateUserDto } from "src/models/users/user/dto/crete-user.dto";
import { UsersService } from "src/models/users/user/user.service";
import { AuthUserDto } from "./dto/auth-user.dto";
import * as bcrypt from 'bcrypt';
import { Tokens } from "./types/token.type";
import { configService } from "src/config/config.service";
import { ErrorMessages } from '../common/helpers/error-messages';

/**
 * AuthService provider is used to process AuthController
 * requests and communicate with the database
 *
 * @see createNewUser()
 * @see loginUser()
 * @see getJwtTokens()
 * @see updateRefreshToken()
 */
@Injectable()
export class AuthService {

    /**
     * Inject (services) providers as constructor dependency
     *
     * @param { UsersService } usersService provider
     * @param { JwtService } jwtService provider
     *
     */
    constructor(
        protected readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) { }

    /**
     * Creating a new user on the side of the service (provider) that
     * communicates with the database
     *
     * @param {CreateUserDto} createUserDto that needs to be created
     * @return {User} created user or bar request exception
     *
     */
    async createNewUser(createUserDto: CreateUserDto): Promise<User> {

        const sql = {
            where: {
                email: createUserDto.email,
            },
        };

        const findUser = await this.usersService.find(sql);
        if (findUser.length) throw new BadRequestException(ErrorMessages.EMAIL_ALREADY_IN_USE);

        return await this.usersService.create(createUserDto);
    }

    /**
     * User login on the side of the service (provider) that
     * communicates with the database
     *
     * @param {AuthUserDto} userDto credentials
     * @return {Tokens} access and refresh tokens
     *
     */
    async loginUser(userDto: AuthUserDto): Promise<Tokens> {
        
        const sql = {
            where: {
                username: userDto.username
            },
            relations: [
                'role',
            ],
        };

        const user = await this.usersService.findOne(sql);
        if(!user) throw new NotFoundException(ErrorMessages.USER_NOT_FOUND);

        const checkCredentials = await bcrypt.compare(userDto.password, user.password);
        if(!checkCredentials) throw new BadRequestException(ErrorMessages.INVALID_CREDENTIALS);

        const tokens = await this.getJwtTokens(user);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return tokens;

    }

    /**
     * Retrieve JWT tokens of logged in user
     *
     * @param {User} user who is logged in
     * @return {Tokens} access and refresh tokens
     *
     */
    async getJwtTokens(user: User): Promise<Tokens> {

        const payload = {
            sub: user.id,
            username: user.username,
            role: user.role.id
        };

        const [at, rt] = await Promise.all([
            this.jwtService.sign(payload, {
                secret: configService.getJwtSecret(),
                expiresIn: configService.getJwtExpTime()
            }),
            this.jwtService.sign(payload, {
                secret: configService.getJwtRefreshSecret(),
                expiresIn: configService.getJwtRefreshExpTime()
            }),
        ]);

        return {
            accessToken: at,
            refreshToken: rt
        }
    }

    /**
     * Update JWT refresh token
     *
     * @param {number} userId who is logged in
     * @return {Promise<void>}
     *
     */
    async updateRefreshToken(userId: number, refreshToken: string): Promise<void> {
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        const user = await this.usersService.findOne({ where: { id: userId } });
        user.refreshToken = hashedRefreshToken;
        await this.usersService.save(user);
    }

}