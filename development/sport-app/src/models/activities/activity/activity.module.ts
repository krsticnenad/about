/**
 |===============================================================
 | Module Class
 |===============================================================
 |
 | Core class annotated with a @Module decorator. The @Module
 | decorator provides metadata that Nest makes use of to organize
 | the application structure. Each controller and service
 | (provider) must be imported into its own @Module
 |
 | Each individual module must be imported into root module
 | known as a @see AppModule
 |
 | @ReadMore https://docs.nestjs.com/modules
 |
 |===============================================================
 */

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from './activity.entity';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';

/**
 * ActivityModule is used to organize the structure (entity,
 * controllers and providers) of the @see Activity entity that is
 * imported into the main module @see AppModule
 */
@Module({
    imports: [TypeOrmModule.forFeature([Activity])],
    controllers: [ActivityController],
    providers: [ActivityService],
    exports: [ActivityService],
})
export class ActivityModule {}