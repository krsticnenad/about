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

import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";
import { Activity } from "./activity.entity";
import { ActivityService } from "./activity.service";
import { ActivityDto } from "./dto/activity.dto";

const CRUD_OPTIONS = {
    model:{ type: Activity },
    query: {
        join: {
        role: {
            eager: true,
        },
        status: {
            eager: true
        }
        },
    },
}

/**
 * Activity Controller is used to handle requests
 * between the client side and the service (provider) side and
 * handles responses to the client.
 * 
 * @see createActivity()
 */
@Crud(CRUD_OPTIONS)
@ApiTags('activities')
@Controller('activities')
export class ActivityController implements CrudController<Activity> {

    /**
     * Inject (service) provider as constructor dependency
     *
     * @param { ActivityService } service provider
     **/
    constructor(public service: ActivityService) { }

    /**
     * Service function call to create a new activity
     * 
     * @param {Activity} body request
     * @return {Promise<Activity>} created activity
     */
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createActivity(@Body() body: Activity): Promise<Activity> {
        return await this.service.create(body);
    }

    @Get()
    async findAll(): Promise<ActivityDto[]> {
        return await this.service.findAll();
    }

}