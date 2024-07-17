/**
 |===============================================================
 | Entity
 |===============================================================
 |
 | Entity is a class that maps to a database table You can create
 | an entity by defining a new class and mark it with @Entity
 |
 | @ReadMore https://orkhan.gitbook.io/typeorm/docs/entities
 |
 |===============================================================
 */

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Unique, BeforeInsert, OneToMany } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { UserRoles } from "../roles/roles.entity";
import { CrudValidationGroups } from "@nestjsx/crud";
import { IsDate, IsNotEmpty, IsOptional, IsString, MaxLength, Min } from "class-validator";
import * as bcrypt from 'bcrypt';
import { DateTime } from "src/common/helpers/datetime";
import { ActivityParticipants } from "src/models/activities/participants/participants.entity";
import { GroupMembers } from "src/models/groups/members/members.entity";

const { CREATE, UPDATE } = CrudValidationGroups;

/**
 * User Class entity is used to map User's properties to a database table
 * with the following columns:
 * 
 * @column id
 * @column first_name
 * @column last_name
 * @column username
 * @column email
 * @column password
 * @column user_phone
 * @column date_registered
 * @column role_id
 * @column refresh_token
 */
@Entity({ name: 'users' })
@Unique(['email'])
@Unique(['username'])
export class User {

    /**
     * Auto-increment primary key
     *
     * @property {number} id
     *
     */
    @PrimaryGeneratedColumn()
    public id: number;
    
    /**
     * Users first name with column name first_name
     *
     * @property {string} firstName
     *
     */
    @IsOptional({ groups: [ UPDATE ] })
    @IsNotEmpty({ groups: [ CREATE ] })
    @IsString({ always: true })
    @MaxLength(100, { always: true })
    @ApiProperty()
    @Column({ name: 'first_name', type: 'varchar', length: 100, nullable: false })
    public firstName: string;

    /**
     * Users last name with column name last_name
     *
     * @property {string} lastName
     *
     */
    @IsOptional({ groups: [ UPDATE ] })
    @IsNotEmpty({ groups: [ CREATE ] })
    @IsString({ always: true })
    @MaxLength(100, { always: true })
    @ApiProperty()
    @Column({ name: 'last_name', type: 'varchar', length: 100, nullable: false })
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
    @Column({ type: 'varchar', length: 100, nullable: false })
    public username: string;

    /**
     * Users email
     *
     * @property {string} email
     *
     */
    @IsOptional({ groups: [UPDATE]})
    @IsNotEmpty({ groups: [CREATE]})
    @IsString({ always: true })
    @MaxLength(100, { always: true })
    @ApiProperty()
    @Column({ type: "varchar", length: 100, nullable: false })
    public email: string;

    /**
     * Users password
     *
     * @property {string} password
     *
     */
    @IsOptional({ groups: [ UPDATE ] })
    @IsNotEmpty({ groups: [ CREATE ] })
    @IsString({ always: true })
    @MaxLength(255, { always: true })
    @Min(8)
    @ApiProperty()
    @Column({ type: 'varchar', length: 255, nullable: false })
    public password: string;

    /**
     * Users phone with column name user_phone
     *
     * @property {string} userPhone
     *
     */
    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @IsString({ always: true })
    @MaxLength(50, { always: true })
    @ApiProperty()
    @Column({ name: "user_phone", length: 50 })
    public userPhone: string;

    /**
     * User registration date with column name date_registered
     *
     * @property {string} userPhone
     *
     */
    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @IsDate()
    @ApiProperty()
    @Column({ name: "date_registered", type: 'datetime', default: new DateTime({format: 'YYYY-MM-DD H:i:s'}).getFullDate() })
    public dateRegistered: Date;

    /**
     * User role id relation
     *
     * @property {string} role
     *
     */
    @ApiProperty()
    @ManyToOne(() => UserRoles, role => role.id, { eager: true })
    @JoinColumn({name: 'role_id'})
    public role: UserRoles;

    /**
     * User activities relation
     *
     * @property {ActivityParticipants[]} activities
     *
     */
    @OneToMany(() => ActivityParticipants, activity => activity.id)
    public activities: ActivityParticipants[]

    /**
     * User groups relation
     *
     * @property {GroupMembers[]} userGroups
     *
     */
    @OneToMany(() => GroupMembers, userGroups => userGroups.id)
    public userGroups: GroupMembers[]

    /**
     * User refresh token with column name refresh_token
     *
     * @property {string} refreshToken
     *
     */
    @IsOptional({ groups: [CREATE, UPDATE]})
    @IsString()
    @ApiProperty()
    @Column({ name: "refresh_token", default: ""})
    public refreshToken: string;

    /**
     * Hash password before insertion
     */
    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

}