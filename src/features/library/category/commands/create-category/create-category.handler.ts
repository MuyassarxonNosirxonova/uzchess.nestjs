import { CreateCategoryCommand } from './create-category.command';
import { BookCategory } from '../../../entities/book.category.entity';
import { ILike } from 'typeorm';
import { ConflictException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CreateCategoryCommand)
export class CreateCategoryHandler implements ICommandHandler<CreateCategoryCommand>{
  async execute(cmd: CreateCategoryCommand){
    const alreadyExists = await BookCategory.existsBy({ title: ILike(cmd.title) });
    if (alreadyExists)
      throw new ConflictException('Title already exists');

    const newCategory = BookCategory.create({ title: cmd.title });
    await BookCategory.save(newCategory);
    return newCategory;
  }
}