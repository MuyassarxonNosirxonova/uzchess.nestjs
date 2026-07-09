import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateNewsCommand } from './create-news.command';

@CommandHandler(CreateNewsCommand)
export class CreateNewsHandler implements  ICommandHandler<CreateNewsCommand> {
  async execute({ title,image,content,date}:CreateNewsCommand){

  }
}