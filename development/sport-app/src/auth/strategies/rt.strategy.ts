import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from 'express';
import { ForbiddenException, Injectable } from "@nestjs/common";
import { configService } from "../../config/config.service";
import { JwtPayload } from "../types/jwt-payload.type";

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor() {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          ignoreExpiration: false,
          secretOrKey: configService.getJwtRefreshSecret(),
          passReqToCallback: true
        });
    }

    validate(req: Request, payload: JwtPayload) {
        const refreshToken = req?.get('authorization')?.replace('Bearer', '').trim();

        if(!refreshToken) throw new ForbiddenException("Refresh token malformed");

        return {
            ...payload,
            refreshToken
        }
    }
}