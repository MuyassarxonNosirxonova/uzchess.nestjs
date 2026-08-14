import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {SetPasswordCommand} from "@/features/auth/user/set-password/set-password.command";
import {User} from "@/features/auth/entities/user.entity";
import {DoesNotExistException} from "@core/exceptions/does-not-exist.exception";
import {Otp} from "@/features/auth/entities/otp.entity";
import argon2 from "argon2";
import {JwtService} from "@nestjs/jwt";


@CommandHandler(SetPasswordCommand)
export class SetPasswordHandler implements ICommandHandler<SetPasswordCommand> {
  constructor(public jwtService: JwtService) {
  }

  async execute({payload}: SetPasswordCommand) {
    const user = await User.findOneBy({username: payload.username});
    DoesNotExistException.ThrowIfNull(user);

    const otpCode = await Otp.findOneBy({code: payload.code, userId: user!.id, isVerified: true});
    DoesNotExistException.ThrowIfNull(otpCode);

    user!.password = await argon2.hash(payload.password);

    await User.save(user!);
    await Otp.remove(otpCode!);

    const jwtPayload = {
      id: user!.id,
      role: user!.type
    }

    const accessToken = this.jwtService.sign(jwtPayload);
    return {accessToken: accessToken};
  }
}