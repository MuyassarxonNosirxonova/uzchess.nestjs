import {Module} from "@nestjs/common";
import {RegisterHandler} from "./user/register/register.handler";
import {LoginHandler} from "./user/login/login.handler";
import {UserController} from "@/features/auth/user/user.controller";
import {VerifyOtpHandler} from "@/features/auth/user/verify-otp/verify-otp.handler";
import {SetPasswordHandler} from "@/features/auth/user/set-password/set-password.handler";
import {MailModule} from "@core/mail/mail.module";

@Module({
  imports: [MailModule],
  controllers: [UserController],
  providers: [
    RegisterHandler,
    VerifyOtpHandler,
    SetPasswordHandler,
    LoginHandler
  ]
})
export class AuthModule {
}