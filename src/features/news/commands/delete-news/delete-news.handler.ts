import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteNewsCommand } from './delete-news.command';
import { News } from '../../entities/news.entity';
import { DoesNotExistException } from '../../../../core/exceptions/does-not-exist.exception';

@CommandHandler(DeleteNewsCommand)
export class DeleteNewsHandler implements ICommandHandler<DeleteNewsCommand> {
  async execute(cmd: DeleteNewsCommand) {
    const news = await News.findOneBy({ id: cmd.id });
    DoesNotExistException.ThrowIfNull(news, 'News with given id not found');

    await News.remove(news!);
    return { message: `News id ${cmd.id} deleted` };
  }
}