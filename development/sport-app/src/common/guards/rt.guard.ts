import { AuthGuard } from "@nestjs/passport";

/**
 * Refresh Token
 */
export class RtGuard extends AuthGuard('jwt-refresh') {
    constructor() {
        super();
    }
}