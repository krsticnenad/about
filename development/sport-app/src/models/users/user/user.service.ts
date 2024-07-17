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

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/crete-user.dto';

/**
 * UsersService provider is used to process UsersController
 * requests and communicate with the database
 * 
 * @see create()
 * @see save()
 */
@Injectable()
export class UsersService extends TypeOrmCrudService<User> {

    /**
     * 
     * Inject (service) provider as constructor dependency
     * 
     * @param {any} repo
     * 
     * */ 
    constructor(@InjectRepository(User) protected readonly repo: any) { 
        super(repo);
    }

    /**
     * Create new user
     *
     * @param {CreateUserDto} createUserDto request
     * @return {User} that was created
     * 
     **/
    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = this.repo.create(createUserDto);
        return this.repo.save(user);
    }

    /**
     * Service function inserting created user
     * 
     * @param {User} user that needs to be created
     * @return {User} created activityCategory
     * 
     **/ 
    async save(user: User): Promise<User> {
        return await this.repo.save(user);
    }
}