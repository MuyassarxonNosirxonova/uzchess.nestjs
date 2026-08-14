import {Body, Controller, Post} from "@nestjs/common";
import {RegisterRequest} from "@/features/auth/user/register/register.request";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {LoginRequest} from "@/features/auth/user/login/login.request";
import {VerifyOtpRequest} from "@/features/auth/user/verify-otp/verify-otp.request";
import {SetPasswordRequest} from "@/features/auth/user/set-password/set-password.request";
import { Public } from '@core/decorators/public.decorator';

@Controller('auth')
export class UserController {
  constructor(
    private cmdBus: CommandBus,
    private queryBus: QueryBus
  ) {
  }
  @Public()
  @Post('register')
  async register(@Body() payload: RegisterRequest) {
    return await this.cmdBus.execute(payload.toCommand());
  }

  @Public()
  @Post('verify')
  async verify(@Body() payload: VerifyOtpRequest) {
    return await this.cmdBus.execute(payload.toCommand());
  }

  @Public()
  @Post('set-password')
  async setPassword(@Body() payload: SetPasswordRequest) {
    return await this.cmdBus.execute(payload.toCommand());
  }

  @Public()
  @Post('login')
  async login(@Body() payload: LoginRequest) {
    return await this.cmdBus.execute(payload.toCommand());
  }
}