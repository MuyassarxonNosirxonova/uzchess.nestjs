import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PublishCourseCommand } from './publish-course.command';
import { Course } from '../../../entities/course.entity';
import { BadRequestException } from '@nestjs/common';
import { DoesNotExistException } from '../../../../../core/exceptions/does-not-exist.exception';

@CommandHandler(PublishCourseCommand)
export class PublishCourseHandler implements ICommandHandler<PublishCourseCommand> {
  async execute(cmd: PublishCourseCommand) {
    const course = await Course.findOneBy({ id: cmd.id });
    DoesNotExistException.ThrowIfNull(course, 'Course with given id not found');

  
    if (course!.sectionsCount === 0 || course!.lessonsCount === 0) {
      throw new BadRequestException(
        'You cannot publish an empty course. Please add at least one section and lesson before publishing',
      );
    }

    course!.isPublished = true;
    return await Course.save(course!);
  }
}
