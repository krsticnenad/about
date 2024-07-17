/**
 |===============================================================
 | Module Class
 |===============================================================
 |
 | Core class annotated with a @Module decorator. The @Module
 | decorator provides metadata that Nest makes use of to organize
 | the application structure. Each controller and service
 | (provider) must be imported into its own @Module
 |
 | Each individual module must be imported into root module
 | known as a @see AppModule
 |
 | @ReadMore https://docs.nestjs.com/modules
 |
 |===============================================================
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';

/**
 * UsersModule is used to organize the structure (entity,
 * controllers and providers) of the @see User entity that is
 * imported into the main module @see AppModule
 */
@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule {}