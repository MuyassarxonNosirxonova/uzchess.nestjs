import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (isPublic) {
      return true;
    }

    const req: Request = context.switchToHttp().getRequest();

    if (!req.headers.authorization) {
      throw new UnauthorizedException();
    }

    const [bearer, token] = req.headers.authorization.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException();
    }

    try {
      // @ts-ignore
      req.user = this.jwtService.verify(token);

      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}