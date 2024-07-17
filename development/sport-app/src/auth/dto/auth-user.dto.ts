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

 /**
 * AuthUserDto is used to provide valiadted and standardized data for
 * the @see User entity for user login purposes
 */
export class AuthUserDto {

    /**
     * Username
     *
     * @property {string} username
     *
     */
    username: string;

    /**
     * Password
     *
     * @property {string} password
     *
     */
    password: string;
}