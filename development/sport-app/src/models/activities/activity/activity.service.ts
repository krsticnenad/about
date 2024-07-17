/**
 |===============================================================
 | Provider
 |===============================================================
 |
 | Providers are crucial for offering functionalities such as
 | database access or API calls. They ensure modular, testable
 | code by effectively handling dependencies. Each Provider must
 | be imported in its own @Module
 |
 | @ReadMore https://docs.nestjs.com/providers
 |
 |===============================================================
 */

import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Activity } from "./activity.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { ErrorMessages } from "src/common/helpers/error-messages";

/**
 * ActivityService provider is used to process
 * ActivityController requests and communicate with the database
 * 
 * @see create()
 */
@Injectable()
export class ActivityService extends TypeOrmCrudService<Activity> {

    /**
     * Inject (service) provider as constructor dependency
     *
     * @param {any} repo
     */
    constructor(
        @InjectRepository(Activity) protected readonly repo: Repository<Activity>
    ) { 
        super(repo);
    }

    /**
     * Service function for creating a new category
     *
     * @param {Activity} activity that needs to be created
     * @return {Activity} created Activity
     */
    async create(activity: Activity): Promise<Activity> {

        try {

            let activityToCreate = this.repo.create(activity);
            return await this.repo.save<Activity>(activityToCreate);

        } catch(error) {
            throw new InternalServerErrorException(ErrorMessages.INTERNAL_SERVER_ERROR);
        }
    }

    async findAll() {
        return await this.repo.find();
    }

    /**
     * Service function inserting created category
     *
     * @param {T} recordToInsert that needs to be inserted
     * @return {Promise<T>} type of the inserted record
     */
    async save<T>(recordToInsert: T): Promise<T> {
        return await this.repo.save(recordToInsert);
    }
}