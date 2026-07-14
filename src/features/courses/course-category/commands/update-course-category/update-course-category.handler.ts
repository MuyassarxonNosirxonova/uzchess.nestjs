import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCourseCategoryCommand } from './update-course-category.command';
import { CourseCategory } from '../../../entities/course-category.entity';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { ILike, Not } from 'typeorm';

@CommandHandler(UpdateCourseCategoryCommand)
export class UpdateCourseCategoryHandler implements ICommandHandler<UpdateCourseCategoryCommand> {
  async execute(cmd: UpdateCourseCategoryCommand) {
    const category = await CourseCategory.findOneBy({ id: cmd.id });
    if (!category) throw new NotFoundException('CourseCategory with given id not found');

    if (cmd.title) category.title = cmd.title;

    const alreadyExists = await CourseCategory.existsBy({ id: Not(category.id), title: ILike(category.title) });
    if (alreadyExists) throw new ConflictException('Title already exists');

    return await CourseCategory.save(category);
  }
}