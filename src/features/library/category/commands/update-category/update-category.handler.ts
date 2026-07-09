import { UpdateCategoryCommand } from './update-category.command';
import { Category } from '../../../entities/category.entity';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ILike, Not } from 'typeorm';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(UpdateCategoryCommand)
export class UpdateCategoryHandler implements ICommandHandler<UpdateCategoryCommand> {
  async execute(cmd:UpdateCategoryCommand){
     const category = await Category.findOneBy({id: cmd.id});
     if(!category)
       throw new NotFoundException('Category with given id not found');

     if(cmd.title)
       category.title = cmd.title;

     const alreadyExits = await Category.existsBy({id: Not(category.id), title: ILike(category.title)});
     if(alreadyExits)
       throw new ConflictException('Title already exists');

    return  await Category.save(category);

  }
}