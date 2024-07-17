/**
 |===============================================================
 | Authorization guard
 |===============================================================
 |
 | Authorization is a great use case for Guards because specific
 | routes should be available only when the caller (usually a
 | specific authenticated user) has sufficient permissions
 |
 | @ReadMore https://docs.nestjs.com/guards#authorization-guard
 |
 |===============================================================
 */

import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

/**
 * Authorization Guard
 * 
 * It will extract and validate the token, and use the extracted
 * information to determine whether the request can proceed or not.
 * 
 */ 
@Injectable()
export class AtGuard extends AuthGuard('jwt') {

    /**
     * Inject (service) provider as constructor dependency
     *
     * @param {Reflector} reflector a decorator that can be used to decorate classes and methods with metadata
     */
    constructor(private reflector: Reflector) {
        super();
    }

    /**
     * Returns whether the user has access to the requested endpoint
     *
     * @param {ExecutionContext} context instance of ExecutionContext
     *
     * @return {boolean} true will be processed, false will deny the request
     */
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const isPublic = this.reflector.getAllAndOverride('isPublic', [context.getHandler(), context.getClass()]);
        if(isPublic) return true;
        return super.canActivate(context);
    }
}