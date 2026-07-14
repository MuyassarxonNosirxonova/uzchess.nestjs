import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CourseCategory } from '../../../entities/course-category.entity';
import { ILike } from 'typeorm';
import { ConflictException } from '@nestjs/common';
import { CreateCourseCategoryCommand } from './create-course-category-command';

@CommandHandler(CreateCourseCategoryCommand)
export class CreateCourseCategoryHandler implements ICommandHandler<CreateCourseCategoryCommand> {
  async execute(cmd: CreateCourseCategoryCommand) {
    const alreadyExists = await CourseCategory.existsBy({ title: ILike(cmd.title) });
    if (alreadyExists) throw new ConflictException('Title already exists');

    const newCategory = CourseCategory.create({ title: cmd.title });
    return await CourseCategory.save(newCategory);
  }
}