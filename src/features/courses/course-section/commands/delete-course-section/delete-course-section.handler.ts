import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { DeleteCourseSectionCommand } from './delete-course-section.command';
import { CourseSection } from '../../../entities/course-section.entity';
import { CourseLesson } from '../../../entities/course-lesson.entity';
import { Course } from '../../../entities/course.entity';
import { DoesNotExistException } from '../../../../../core/exceptions/does-not-exist.exception';
import { CourseSectionDeletedEvent } from '../../../events/course-section-deleted.events';


@CommandHandler(DeleteCourseSectionCommand)
export class DeleteCourseSectionHandler implements ICommandHandler<DeleteCourseSectionCommand> {
  constructor(private eventBus: EventBus) {}

  async execute(cmd: DeleteCourseSectionCommand) {
    const section = await CourseSection.findOneBy({ id: cmd.id });
    DoesNotExistException.ThrowIfNull(section, 'CourseSection with given id not found');

    const courseId = section!.courseId;


    const orphanedLessonsCount = await CourseLesson.countBy({ courseSectionId: section!.id });

    await CourseSection.remove(section!);

    if (orphanedLessonsCount > 0) {
      await Course.createQueryBuilder()
        .update(Course)
        .set({ lessonsCount: () => 'GREATEST("lessonsCount" - :count, 0)' })
        .setParameter('count', orphanedLessonsCount)
        .where('id = :id', { id: courseId })
        .execute();
    }

    this.eventBus.publish(new CourseSectionDeletedEvent(courseId));

    return { message: `CourseSection #${cmd.id} deleted` };
  }
}
