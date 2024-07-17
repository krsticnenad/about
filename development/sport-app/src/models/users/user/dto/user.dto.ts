/**
 |===============================================================
 | User DTO design pattern
 |===============================================================
 |
 | DTO (Data Transfer Object) is a design pattern that is used
 | to transfer data between different layers of an application.
 | The DTO pattern is used to provide and display a standardized
 | and validating encapsulated data.
 |
 |===============================================================
 */

import { ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'
import { User } from '../user.entity'

/**
 * UserDTO is used to provide valiadted and standardized data for
 * the @see User entity.
 * 
 * @see assignPropsToDto()
 * @see passPropsfromEntity()
 */
export class UserDto implements Readonly<UserDto> {

  /**
   * Auto-increment primary key
   *
   * @property {number} id
   *
   */
  @ApiProperty()
  id: number

  /**
   * First name
   *
   * @property {string} firstName
   *
   */
  @ApiProperty()
  @IsString()
  firstName: string

  /**
   * Last name
   *
   * @property {string} lastName
   *
   */
  @ApiProperty()
  @IsString()
  lastName: string

  /**
   * Username
   *
   * @property {string} username
   *
   */
  @ApiProperty()
  @IsString()
  username: string

  /**
   * Users email
   *
   * @property {string} email
   *
   */
  @ApiProperty()
  @IsString()
  email: string

  /**
   * Users password
   *
   * @property {string} lastName
   *
   */
  @ApiProperty()
  @IsString()
  password: string

  /**
   * Users phone number
   *
   * @property {string} userPhone
   *
   */
  @ApiProperty()
  @IsString()
  userPhone: string

  /**
   * Users role id
   *
   * @property {string} roleId
   *
   */
  @ApiProperty()
  roleId: number

  /**
   * Date of user registration
   *
   * @property {Date} dateRegistered
   *
   */
  @ApiProperty()
  @IsString()
  dateRegistered: Date

  /**
   * The function is used to assign passed properties to @see UserDTO properties
   * 
   * @param {Partial<UserDto>} dto
   * @return {UserDto} user
   */
  public static assignPropsToDto(dto: Partial<UserDto>): UserDto {
    const user = new UserDto()
    user.id = dto.id
    user.firstName = dto.firstName
    user.lastName = dto.lastName
    user.username = dto.username
    user.email = dto.email
    user.userPhone = dto.userPhone
    user.roleId = dto.roleId
    user.dateRegistered = dto.dateRegistered

    return user;

  }

  /**
   * The function is used to pass an object with @see User entity properties
   * 
   * @param {User} entity
   * @return {UserDto}
   */
  public static passPropsfromEntity(entity: User): UserDto {
    return this.assignPropsToDto({
      id: entity.id,
      firstName: entity.firstName,
      lastName: entity.lastName,
      username: entity.username,
      email: entity.email,
      userPhone: entity.userPhone,
      roleId: entity.role.id,
      dateRegistered: entity.dateRegistered
    });
  }

}