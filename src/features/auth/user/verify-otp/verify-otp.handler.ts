import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {VerifyOtpCommand} from "./verify-otp.command";
import {User} from "@/features/auth/entities/user.entity";
import {Otp} from "@/features/auth/entities/otp.entity";
import {DoesNotExistException} from "@core/exceptions/does-not-exist.exception";

@CommandHandler(VerifyOtpCommand)
export class VerifyOtpHandler implements ICommandHandler<VerifyOtpCommand> {
  async execute({payload}: VerifyOtpCommand) {
    const user = await User.findOneBy({username: payload.username});
    DoesNotExistException.ThrowIfNull(user);

    const otpCode = await Otp.findOneBy({code: payload.code, userId: user!.id, isVerified: false});
    DoesNotExistException.ThrowIfNull(otpCode);

    let diff = Math.floor((Date.now() - Date.parse(otpCode!.createdAt)) / 1000 / 60)
    DoesNotExistException.ThrowIf(diff >= 1);

    otpCode!.isVerified = true;
    user!.isVerified = true;

    await User.save(user!);
    await Otp.save(otpCode!);

    return {success: true}
  }
}