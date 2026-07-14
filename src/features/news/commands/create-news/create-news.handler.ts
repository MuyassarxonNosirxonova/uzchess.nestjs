import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateNewsCommand } from './create-news.command';
import { News } from '../../entities/news.entity';

@CommandHandler(CreateNewsCommand)
export class CreateNewsHandler implements  ICommandHandler<CreateNewsCommand> {
  async execute({ title, image, content, date }: CreateNewsCommand) {
    const news = News.create({ title, image, content, date });
    return await News.save(news);

}
}