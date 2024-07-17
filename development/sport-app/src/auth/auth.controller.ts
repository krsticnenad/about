/**
 |===============================================================
 | Controller
 |===============================================================
 |
 | Controllers are responsible for handling incoming requests and
 | returning responses to the client. Each Controller must be
 | imported in its own @Module
 |
 | @ReadMore https://docs.nestjs.com/controllers
 |
 |===============================================================
 */

import { Controller, HttpCode, HttpStatus, Post, Body, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Public } from "../decorators";
import { CreateUserDto } from "src/models/users/user/dto/crete-user.dto";
import { AuthUserDto } from "./dto/auth-user.dto";
import { AuthService } from "./auth.service";
import { Tokens } from "./types/token.type";
import { User } from "src/models/users/user/user.entity";

/**
 * Auth Controller Class
 *
 * The Authentication Controller that serves to handle requests
 * between the client side and the service (provider) side and
 * returns responses to the client.
 * 
 * @see register()
 * @see login()
 * @see logout()
 */
@ApiTags('auth')
@Controller('auth')
export class AuthController {

    /**
     * Inject provider as constructor dependency
     *
     * @param { AuthService } authService provider
     *
     **/
    constructor(private authService: AuthService) {}

    /**
     * New user registration function
     *
     * @Public access for non-authenticated users
     * @Post method with string parameter that represents uri to the endpoint
     *
     * @param {CreateUserDto} body request
     * @return {User} user object
     */
    @Public()
    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() body: CreateUserDto): Promise<User> {
        const user = await this.authService.createNewUser(body);
        return user;
    }

    /**
     * Login user
     *
     * @Public access for non-authenticated users
     * @Post method with string parameter that represents uri to the endpoint
     *
     * @param {AuthUserDto} body request
     * @return {User} new user object
     */
    @Public()
    @Post('login')
    async login(@Body() body: AuthUserDto): Promise<Tokens> {
        return await this.authService.loginUser(body);
    }

    @Post('logout')
    async logout() {}


}