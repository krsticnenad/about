/**
 |===============================================================
 | Activity DTO design pattern
 |===============================================================
 |
 | DTO (Data Transfer Object) is a design pattern that is used
 | to transfer data between different layers of an application.
 | The DTO pattern is used to provide and display a standardized
 | and validating encapsulated data.
 |
 |===============================================================
 */

import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";
import { Activity } from "../activity.entity";
import { ActivityParticipants } from "../../participants/participants.entity";

/**
 * ActivityDto is used to provide valiadted and standardized data for
 * the @see Activity entity.
 * 
 * @see assignPropsToDto()
 * @see passPropsfromEntity()
 */
export class ActivityDto implements Readonly<ActivityDto> {

    /**
     * @property {number} id of the activity
     */
    @ApiProperty()
    public id: number

    /**
     * @property {string} title of the activity
     */
    @ApiProperty()
    @IsString()
    public title: string
    
    /**
     * @property {Date} date of the activity
     */
    @ApiProperty()
    @IsString()
    public date: Date
    
    /**
     * @property {Date} timeStarts of the activity
     */
    @ApiProperty()
    @IsString()
    public timeStarts: Date
    
    /**
     * @property {Date} timeEnds of the activity
     */
    @ApiProperty()
    public timeEnds: Date
    
    /**
     * @property {number} category of the activity
     */
    @ApiProperty()
    @IsString()
    public category: number
    
    /**
     * @property {number} limit of the activity participants
     */
    @ApiProperty()
    public limit: number

    /**
     * @property {ActivityParticipants[]} participants participants of the activity
     */
    @ApiProperty()
    public participants: ActivityParticipants[]
    
    /**
     * @property {string} location of the activity
     */
    @ApiProperty()
    @IsString()
    public location: string
    
    /**
     * @property {number} price of the activity
     */
    @ApiProperty()
    public price: number
    
    /**
     * @property {string} note of the activity
     */
    @ApiProperty()
    @IsString()
    public note: string
    
    /**
     * @property {boolean} isPrivate visibility of the activity
     */
    @ApiProperty()
    @IsBoolean()
    public isPrivate: boolean

    /**
     * @property {Date} dateCreated of the activity
     */
    @ApiProperty()
    @IsString()
    public dateCreated: Date

    /**
     * The function is used to assign passed properties to @UserDTO properties
     */
    public static assignPropsToDto(dto: Partial<ActivityDto>) {
        const activity = new ActivityDto()
        activity.id = dto.id;
        activity.title = dto.title;
        activity.date = dto.date;
        activity.timeStarts = dto.timeStarts;
        activity.timeEnds = dto.timeEnds;
        activity.category = dto.category;
        activity.limit = dto.limit;
        activity.participants = dto.participants;
        activity.location = dto.location;
        activity.price = dto.price;
        activity.note = dto.note;
        activity.isPrivate = dto.isPrivate;
        activity.dateCreated = dto.dateCreated;

        return activity;
    }

    /**
     * The function is used to pass an object with @User entity properties
     */
    public static passPropsfromEntity(entity: Activity) {
        return this.assignPropsToDto({
            id: entity.id,
            title: entity.title,
            date: entity.date,
            timeStarts: entity.timeStarts,
            timeEnds: entity.timeEnds,
            category: entity.category,
            limit: entity.limit,
            participants: entity.participants,
            location: entity.location,
            price: entity.price,
            note: entity.note,
            isPrivate: entity.isPrivate,
            dateCreated: entity.dateCreated,
        });
    }

}