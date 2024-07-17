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
 | Each individual module must be imported into this @Module
 |
 | @ReadMore https://docs.nestjs.com/modules
 |
 |===============================================================
 */

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { UsersModule } from './models/users/user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards';
import { ActivityModule } from './models/activities/activity/activity.module';

/**
 * AppModule is used to organize the structure (entity,
 * controllers and providers) of the application that is
 * imported into this root module
 */
@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UsersModule,
    ActivityModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AtGuard
    }
  ],
})
export class AppModule {}
