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

import { CrudValidationGroups } from "@nestjsx/crud";
import { ApiProperty } from "@nestjsx/crud/lib/crud";
import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ActivityCategory } from "../category/category.entity";
import { DateTime } from "src/common/helpers/datetime";
import { ActivityParticipants } from "../participants/participants.entity";

const { CREATE, UPDATE } = CrudValidationGroups;

/**
 * Entity class that represents a table in the database
 * named 'activities' with the following columns:
 *
 * @column id
 * @column title
 * @column date
 * @column time_starts
 * @column time_ends
 * @column category
 * @column limit
 * @column location
 * @column price
 * @column note
 * @column is_private
 */
@Entity({ name: 'activities' })
export class Activity {

    /**
     * Auto-increment primary key
     *
     * @property {number} id
     *
     */
    @PrimaryGeneratedColumn()
    public id: number

    /**
     * Activity title
     *
     * @var {string} title
     *
     */
    @IsOptional({ groups: [ UPDATE ] })
    @IsNotEmpty({ groups: [ CREATE ] })
    @IsString({ always: true })
    @ApiProperty()
    @Column({ type: 'varchar', length: 100, nullable: false })
    public title: string

    /**
     * Date of activity
     *
     * @var {Date} date
     *
     */
    @IsOptional({ groups: [ UPDATE ] })
    @IsNotEmpty({ groups: [ CREATE ] })
    @IsDate()
    @ApiProperty()
    @Column({ type: 'date' })
    public date: Date

    /**
     * Activity start time
     *
     * @var {string} timeStarts
     *
     */
    @IsNotEmpty({ groups: [ CREATE ] })
    @IsDate()
    @ApiProperty()
    @Column({ name: 'time_starts', type: 'datetime', nullable: false })
    public timeStarts: Date

    /**
     * Activity end time
     *
     * @var {Date} timeEnds
     *
     */
    @IsOptional({ groups: [ CREATE, UPDATE ] })
    @IsDate()
    @ApiProperty()
    @Column({ name: 'time_ends', type: 'datetime' })
    public timeEnds: Date

    /**
     * Activity category
     *
     * @var {string} category
     *
     */
    @IsOptional({ groups: [ UPDATE ] })
    @IsNotEmpty({ groups: [ CREATE ] })
    @ApiProperty()
    @ManyToOne(() => ActivityCategory, activityCategory => activityCategory.id)
    @JoinColumn({ name: 'category_id' })
    public category: number

    /**
     * Limit of the participants of the activity
     *
     * @var {number} limit
     *
     */
    @IsOptional({ groups: [ CREATE, UPDATE ] })
    @ApiProperty()
    @Column({ type: 'int' })
    public limit: number

    /**
     * Activity participants
     *
     * @property {ActivityParticipants[]} activity
     *
     */
    @OneToMany(() => ActivityParticipants, participant => participant.activity, { cascade: ['insert', 'remove'] })
    public participants: ActivityParticipants[]

    /**
     * Activity location - long, lat
     *
     * @var {string} location
     *
     */
    @IsOptional({ groups: [ UPDATE ] })
    @IsNotEmpty({ groups: [ CREATE ] })
    @ApiProperty()
    @Column({ type: 'varchar', length: 100, nullable: false })
    public location: string

    /**
     * Activity price - If it is free the value of the column is null
     *
     * @var {number} price
     *
     */
    @IsOptional({ groups: [ CREATE, UPDATE ] })
    @ApiProperty()
    @Column({ type: 'int', nullable: true })
    public price: number

    /**
     * Activity note - Additional descriptive text of the activity
     *
     * @var {string} note
     *
     */
    @IsOptional({ groups: [CREATE, UPDATE] })
    @ApiProperty()
    @Column({ type: 'text', nullable: true })
    public note: string

    /**
     * Activity visibility - Whether it is available to
     * everyone or only to the owner/group
     *
     * @var {boolean} isPrivate
     *
     */
    @IsOptional({ groups: [ UPDATE ] })
    @IsNotEmpty({ groups: [ CREATE ] })
    @ApiProperty()
    @Column({ name: 'is_private', default: false, nullable: false })
    public isPrivate: boolean

    /**
     * Activity creation date
     *
     * @property {Date} dateCreated
     *
     */
    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @IsDate()
    @ApiProperty()
    @Column({ name: "date_created", type: 'datetime', default: new DateTime({format: 'YYYY-MM-DD H:i:s'}).getFullDate() })
    public dateCreated: Date;

}