import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {RegisterCommand} from "./register.command";
import {User, LoginType} from "@/features/auth/entities/user.entity";
import {AlreadyExistsException} from "@core/exceptions/already-exists.exception";
import {Otp} from "@/features/auth/entities/otp.entity";
import {MailService} from "@core/mail/mail.service";

@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand> {
  constructor(private readonly mailService: MailService) {}

  async execute({payload}: RegisterCommand) {
    const user = await User.findOneBy({username: payload.username});
    if (user && user.isVerified && user.password)
      throw new AlreadyExistsException();

    if (user) {
      await User.remove(user);
    }

    let newUser = User.create(payload);
    newUser = await User.save(newUser);
    let otpCode = new Otp();
    otpCode.userId = newUser.id;

    let randInt = Math.ceil(Math.random() * 999999).toString();
    let code: string[] = []
    for (let i = randInt.length; i < 6; i++) {
      code.push('0');
    }
    code.push(randInt)

    otpCode.code = code.join('')

    await Otp.save(otpCode);

    if (payload.loginType === LoginType.Email) {
      await this.mailService.sendOtp(payload.username, otpCode.code);
    } else {
      // TODO: SMS orqali jo'natish (LoginType.Number holati uchun)
      console.log(otpCode.code);
    }

    return newUser;
  }
}