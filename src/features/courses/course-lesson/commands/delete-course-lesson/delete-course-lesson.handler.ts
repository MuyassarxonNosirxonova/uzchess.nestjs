import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { DeleteCourseLessonCommand } from './delete-course-lesson.command';
import { CourseLesson } from '../../../entities/course-lesson.entity';
import { DoesNotExistException } from '../../../../../core/exceptions/does-not-exist.exception';
import { CourseLessonDeletedEvent} from '../../../events/handlers/course-lesson-deleted.event';

@CommandHandler(DeleteCourseLessonCommand)
export class DeleteCourseLessonHandler implements ICommandHandler<DeleteCourseLessonCommand> {
  constructor(private eventBus: EventBus) {}

  async execute(cmd: DeleteCourseLessonCommand) {
    const lesson = await CourseLesson.findOneBy({ id: cmd.id });
    DoesNotExistException.ThrowIfNull(lesson, 'CourseLesson with given id not found');

    const courseId = lesson!.courseId;
    await CourseLesson.remove(lesson!);

    this.eventBus.publish(new CourseLessonDeletedEvent(courseId));

    return { message: `CourseLesson id ${cmd.id} deleted` };
  }
}
