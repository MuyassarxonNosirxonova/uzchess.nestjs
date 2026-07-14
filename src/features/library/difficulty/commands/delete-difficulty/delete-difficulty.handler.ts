import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteDifficultyCommand } from './delete-difficulty.command';
import { DeleteNewsCommand } from '../../../../news/commands/delete-news/delete-news.command';
import { Difficulty } from '../../../entities/difficulty.entity';
import { DoesNotExistException } from '../../../../../core/exceptions/does-not-exist.exception';

@CommandHandler(DeleteDifficultyCommand)
export class DeleteDifficultyHandler implements ICommandHandler<DeleteDifficultyCommand> {
  async execute(cmd:DeleteNewsCommand){
    const difficulties = await Difficulty.findOneBy({id:cmd.id});
    DoesNotExistException.ThrowIfNull(difficulties,'Difficulties with given id not found');

    await Difficulty.remove(difficulties!);
    return {message: 'Difficulty was deleted successfully.'};
  }
}