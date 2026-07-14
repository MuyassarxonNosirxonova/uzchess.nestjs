import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateDifficultyCommand } from './update-difficulty.command';
import { Difficulty } from '../../../entities/difficulty.entity';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { ILike, Not } from 'typeorm';

@CommandHandler(UpdateDifficultyCommand)
export class UpdateDifficultyHandler
  implements ICommandHandler<UpdateDifficultyCommand>
{
  async execute(cmd: UpdateDifficultyCommand) {
    const difficulty = await Difficulty.findOneBy({
      id: cmd.id,
    });

    if (!difficulty) {
      throw new NotFoundException(
        'Difficulty with given id not found',
      );
    }

    if (cmd.title) {
      difficulty.title = cmd.title;
    }

    if (cmd.icon) {
      difficulty.icon = cmd.icon;
    }

    const alreadyExists = await Difficulty.existsBy({
      id: Not(difficulty.id),
      title: ILike(difficulty.title),
    });

    if (alreadyExists) {
      throw new ConflictException(
        'Title already exists',
      );
    }

    return await Difficulty.save(difficulty);
  }
}