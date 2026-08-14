import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Request} from "express";
import { Reflector } from '@nestjs/core';
import { RolesKey } from '../decorators/roles.decorator';
import { UserType } from '@/enums/user-type.enum';


@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector
  ) {
  }

  canActivate(context: ExecutionContext) {
    const req: Request = context.switchToHttp().getRequest();
    const roles: UserType[] = this.reflector.getAllAndOverride(RolesKey,[context.getHandler(),context.getClass()]);
    if (!roles)
      return true;

    // @ts-ignore
    return roles.includes(req.user.role);



  }
}
