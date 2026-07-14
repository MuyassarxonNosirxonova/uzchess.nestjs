import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateCourseSectionCommand } from './create-course-section.command';
import { CourseSection } from '../../../entities/course-section.entity';
import { Course } from '../../../entities/course.entity';
import { DoesNotExistException } from '../../../../../core/exceptions/does-not-exist.exception';
import { CourseSectionCreatedEvent } from '../../../events/course-section-created.event';


@CommandHandler(CreateCourseSectionCommand)
export class CreateCourseSectionHandler implements ICommandHandler<CreateCourseSectionCommand> {
  constructor(private eventBus: EventBus) {}

  async execute(cmd: CreateCourseSectionCommand) {
    DoesNotExistException.ThrowIfNull(await Course.findOneBy({ id: cmd.courseId }), 'Course not found');

    const newSection = CourseSection.create({
      courseId: cmd.courseId,
      title: cmd.title,
      date: cmd.date,
      order: cmd.order,
    });
    await CourseSection.save(newSection);

    this.eventBus.publish(new CourseSectionCreatedEvent(cmd.courseId));

    return newSection;
  }
}
