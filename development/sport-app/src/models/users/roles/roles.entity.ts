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

import { ApiProperty } from "@nestjs/swagger";
import { CrudValidationGroups } from "@nestjsx/crud";
import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User } from "../user/user.entity";

const { CREATE, UPDATE } = CrudValidationGroups;

/**
 * UserRoles class entity is used to map user role properties to a database table.
 */
@Entity({ name: "user_roles" })
export class UserRoles {

  /**
   * @property {number} id of the role
   */
  @PrimaryGeneratedColumn()
  public id: number;

  /**
   * @property {string} role of the role
   */
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsString({ always: true })
  @MaxLength(100, { always: true })
  @ApiProperty()
  @Column({ type: "varchar", length: 100, nullable: false, unique: true })
  public role: string;

  /**
   * @property {User[]} users relation
   */
  @OneToMany(() => User, user => user.role)
  users: User[];
}
