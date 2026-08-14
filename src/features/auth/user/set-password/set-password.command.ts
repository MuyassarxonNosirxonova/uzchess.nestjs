import {Command} from "@nestjs/cqrs";
import {SetPasswordRequest} from "@/features/auth/user/set-password/set-password.request";

export class SetPasswordCommand extends Command<object> {
  constructor(public payload: SetPasswordRequest) {
    super();
  }
}