import { UpdateCategoryCommand } from './update-category.command';
import { BookCategory } from '../../../entities/book.category.entity';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { ILike, Not } from 'typeorm';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(UpdateCategoryCommand)
export class UpdateCategoryHandler implements ICommandHandler<UpdateCategoryCommand> {
  async execute(cmd: UpdateCategoryCommand){
    const category = await BookCategory.findOneBy({ id: cmd.id });
    if (!category)
      throw new NotFoundException('Category with given id not found');

    if (cmd.title)
      category.title = cmd.title;

    const alreadyExits = await BookCategory.existsBy({ id: Not(category.id), title: ILike(category.title) });
    if (alreadyExits)
      throw new ConflictException('Title already exists');

    return await BookCategory.save(category);
  }
}