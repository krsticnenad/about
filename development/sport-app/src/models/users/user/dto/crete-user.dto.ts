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

import { CrudValidationGroups } from "@nestjsx/crud";
import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { IsDate, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from "class-validator";

const { CREATE, UPDATE } = CrudValidationGroups;

/**
 * CreateUserDto is used to provide valiadted and standardized
 * properties for the @see User entity when creating new users.
 */
export class CreateUserDto {

    /**
     * First name of the user
     *
     * @property {string} firstName
     *
     */
    @IsOptional({ groups: [ UPDATE ] })
    @IsNotEmpty({ groups: [ CREATE ] })
    @IsString({ always: true })
    @MaxLength(100, { always: true })
    @ApiProperty( )
    public firstName: string;

    /**
     * Last name of the user
     *
     * @property {string} lastName
     *
     */
    @IsOptional({ groups: [ UPDATE ] })
    @IsNotEmpty({ groups: [ CREATE ] })
    @IsString({ always: true })
    @MaxLength(100, { always: true })
    @ApiProperty()
    public lastName: string;

    /**
     * Username
     *
     * @property {string} username
     *
     */
    @IsOptional({ groups: [ UPDATE ] })
    @IsNotEmpty({ groups: [ CREATE ] })
    @IsString({ always: true })
    @MaxLength(100, { always: true })
    @ApiProperty()
    public username: string;

    /**
     * User email
     *
     * @property {string} email
     *
     */
    @IsOptional({ groups: [ UPDATE ] })
    @IsNotEmpty({ groups: [ CREATE ] })
    @IsString({ always: true })
    @MaxLength(100, { always: true })
    @ApiProperty()
    public email: string;

    /**
     * User password
     *
     * @property {string} password
     *
     */
    @IsOptional({ groups: [ UPDATE ] })
    @IsNotEmpty({ groups: [ CREATE ] })
    @IsString({ always: true })
    @MaxLength(256, { always: true })
    @Min(8)
    @ApiProperty()
    password: string;

    /**
     * Date of birth of the user
     *
     * @property {Date} birthDate
     *
     */
    @IsOptional({ groups: [ UPDATE ] })
    @IsNotEmpty({ groups: [ CREATE ] })
    @IsDate()
    @ApiProperty()
    public birthDate: Date;

    /**
     * Date of user registration
     *
     * @property {Date} dateRegistered
     *
     */
    @IsOptional({ groups: [ UPDATE ] })
    @IsNotEmpty({ groups: [ CREATE ] })
    @IsString({ always: true })
    @IsDate()
    @ApiProperty()
    public dateRegistered: Date;

    /**
     * User refresh token
     *
     * @property {string} refreshToken
     *
     */
    @IsOptional({ groups: [ UPDATE ] })
    @IsNotEmpty({ groups: [ CREATE ] })
    @IsString({ always: true })
    @ApiProperty()
    private refreshToken: string;



}