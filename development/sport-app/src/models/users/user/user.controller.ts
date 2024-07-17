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

import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { User } from './user.entity';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/crete-user.dto';

const CRUD_OPTIONS = {
  model:{ type: User },
  query: {
    join: {
      role: {
        eager: true,
      },
      status: {
        eager: true,
      }
    },
    exclude: [
      "password",
    ]
  },
}

/**
 * The Users Controller is used to handle requests between the
 * client side and the service (provider) side and handles
 * responses to the client.
 * 
 * @see createNewUser()
 */
@Crud(CRUD_OPTIONS)
@ApiTags("Users")
@Controller('users')
export class UsersController implements CrudController<User> {

  /**
   * Inject (service) provider as constructor dependency
   *
   * @param { UsersService } service provider
   */
  constructor(public service: UsersService) { }

  /**
   * Service function call to create a new user
   *
   * @param {User} body request
   * @return {User}
   */
  @Post('users')
  @HttpCode(HttpStatus.CREATED)
  async createNewUser(@Body() body: CreateUserDto): Promise<User> {
      return await this.service.create(body);
  }

}
