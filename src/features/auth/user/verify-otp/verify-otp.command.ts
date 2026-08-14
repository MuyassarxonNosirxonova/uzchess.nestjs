import {Command} from "@nestjs/cqrs";
import {VerifyOtpRequest} from "./verify-otp.request";

export class VerifyOtpCommand extends Command<object> {
  constructor(public payload: VerifyOtpRequest) {
    super();
  }
}