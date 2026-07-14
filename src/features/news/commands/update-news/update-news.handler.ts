import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateNewsCommand } from './update-news.command';
import { News } from '../../entities/news.entity';
import { DoesNotExistException } from '../../../../core/exceptions/does-not-exist.exception';

@CommandHandler(UpdateNewsCommand)
export class UpdateNewsHandler implements ICommandHandler<UpdateNewsCommand> {
  async execute(cmd: UpdateNewsCommand) {
    const news = await News.findOneBy({ id: cmd.id });
    DoesNotExistException.ThrowIfNull(news, 'News with given id not found');

    if (cmd.title) news!.title = cmd.title;
    if (cmd.image) news!.image = cmd.image;
    if (cmd.content) news!.content = cmd.content;
    if (cmd.date) news!.date = cmd.date;

    return await News.save(news!);
  }
}