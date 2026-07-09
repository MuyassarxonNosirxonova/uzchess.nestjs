import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LoginCommand } from './login.command';
import { User } from '../../entities/user.entity';
import { DoesNotExistException } from '../../../../core/exceptions/does-not-exist.exception';
import argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
  constructor(private jwtService: JwtService) {}

  async execute({ payload }: LoginCommand) {
    const user = await User.findOneBy({ username: payload.login });
    DoesNotExistException.ThrowIfNull(user, 'Username or Password is incorrect');

    const passwordMatch = await argon2.verify(user!.password, payload.password);
    DoesNotExistException.ThrowIfNot(passwordMatch, 'Username or Password is incorrect');

    const jwtPayload = {
      id: user!.id,
      role:user!.role
    };

    const accessToken = this.jwtService.sign(jwtPayload);
    return { accessToken: accessToken };
  }
}
