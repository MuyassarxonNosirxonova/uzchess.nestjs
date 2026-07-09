import { Body, Controller, Post } from '@nestjs/common';
import { RegisterRequest } from './register/register.request';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { LoginRequest } from './login/login.request';
import { Roles } from '../../../core/decorators/roles.decorator';
import { Role } from '../../../core/enums/role.enum';

@Controller('auth')
export class UserController {
  constructor(
    private cmdBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Post('register')
  async register(@Body() payload: RegisterRequest) {
    return await this.cmdBus.execute(payload.toCommand());
  }
  @Post('login')
  async login(@Body() payload: LoginRequest) {
    return await this.cmdBus.execute(payload.toCommand());
  }
}