import { UpdateAuthorCommand } from './update-author.command';
import { Author } from '../../../entities/author.entity';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { ILike, Not } from 'typeorm';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(UpdateAuthorCommand)
export class UpdateAuthorHandler implements ICommandHandler<UpdateAuthorCommand> {
  async execute(cmd: UpdateAuthorCommand) {
    const author = await Author.findOneBy({ id: cmd.id });
    if (!author) throw new NotFoundException('Author with given id not found');

    if (cmd.fullName) author.fullName = cmd.fullName;

    const alreadyExists = await Author.existsBy({ id: Not(author.id), fullName: ILike(author.fullName) });
    if (alreadyExists) throw new ConflictException('Full name already exists');

    return await Author.save(author);
  }
}
