import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCourseLessonCommand } from './update-course-lesson.command';
import { CourseLesson } from '../../../entities/course-lesson.entity';
import { CourseSection } from '../../../entities/course-section.entity';
import { DoesNotExistException } from '../../../../../core/exceptions/does-not-exist.exception';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(UpdateCourseLessonCommand)
export class UpdateCourseLessonHandler implements ICommandHandler<UpdateCourseLessonCommand> {
  async execute(cmd: UpdateCourseLessonCommand) {
    const lesson = await CourseLesson.findOneBy({ id: cmd.id });
    DoesNotExistException.ThrowIfNull(lesson, 'CourseLesson with given id not found');

    if (cmd.title) lesson!.title = cmd.title;
    if (cmd.content !== undefined) lesson!.content = cmd.content;
    if (cmd.video) lesson!.video = cmd.video;
    if (cmd.thumbnail !== undefined) lesson!.thumbnail = cmd.thumbnail;
    if (cmd.date) lesson!.date = cmd.date;
    if (cmd.order !== undefined) lesson!.order = cmd.order;
    if (cmd.isFree !== undefined) lesson!.isFree = cmd.isFree;

    if (cmd.courseSectionId) {
      const section = await CourseSection.findOneBy({ id: cmd.courseSectionId });
      DoesNotExistException.ThrowIfNull(section, 'CourseSection not found');
      if (section!.courseId !== lesson!.courseId) {
        throw new BadRequestException(
          "Bu section berilgan course'ga tegishli emas",
        );
      }
      lesson!.courseSectionId = cmd.courseSectionId;
    }

    return await CourseLesson.save(lesson!);
  }
}
