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
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/models/users/user/user.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AtStrategy } from './strategies/at.strategy';
import { RtStrategy } from './strategies/rt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { configService } from 'src/config/config.service';

/**
 * AuthModule is used to organize the structure (entity,
 * controllers and providers) and imported into the main
 * module @see AppModule
 */
@Module({
    providers: [
        AuthService,
        JwtStrategy,
        AtStrategy,
        RtStrategy,
    ],
    imports: [
        UsersModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: configService.getJwtSecret(),
            signOptions: {
                expiresIn: configService.getJwtExpTime(),
            },
        }),
    ],
    controllers: [AuthController],
    exports: [AuthService],
})

export class AuthModule {}