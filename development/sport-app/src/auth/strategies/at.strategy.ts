import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { configService } from "../../config/config.service";
import { JwtPayload } from "../types/jwt-payload.type";

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          ignoreExpiration: false,
          secretOrKey: configService.getJwtSecret(),
        });
    }

    validate(payload: JwtPayload) {
        return payload;
    }
}