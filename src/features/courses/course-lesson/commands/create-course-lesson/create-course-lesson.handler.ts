import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateCourseLessonCommand } from './create-course-lesson.command';
import { CourseLesson } from '../../../entities/course-lesson.entity';
import { Course } from '../../../entities/course.entity';
import { CourseSection } from '../../../entities/course-section.entity';
import { DoesNotExistException } from '../../../../../core/exceptions/does-not-exist.exception';
import { BadRequestException } from '@nestjs/common';
import { CourseLessonCreatedEvent } from '../../../events/course-lesson-created.event';


@CommandHandler(CreateCourseLessonCommand)
export class CreateCourseLessonHandler implements ICommandHandler<CreateCourseLessonCommand> {
  constructor(private eventBus: EventBus) {}

  async execute(cmd: CreateCourseLessonCommand) {
    DoesNotExistException.ThrowIfNull(await Course.findOneBy({ id: cmd.courseId }), 'Course not found');

    const section = await CourseSection.findOneBy({ id: cmd.courseSectionId });
    DoesNotExistException.ThrowIfNull(section, 'CourseSection not found');


    if (section!.courseId !== cmd.courseId) {
      throw new BadRequestException('This section does not belong to the given course.');
    }

    const newLesson = CourseLesson.create({
      courseId: cmd.courseId,
      courseSectionId: cmd.courseSectionId,
      title: cmd.title,
      content: cmd.content,
      thumbnail: cmd.thumbnail,
      video: cmd.video,
      order: cmd.order,
      date: cmd.date,
      isFree: cmd.isFree,
    });
    await CourseLesson.save(newLesson);

    this.eventBus.publish(new CourseLessonCreatedEvent(cmd.courseId));

    return newLesson;
  }
}
