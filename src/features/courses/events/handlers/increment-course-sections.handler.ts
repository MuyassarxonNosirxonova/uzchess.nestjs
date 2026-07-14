import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CourseSectionCreatedEvent } from '../course-section-created.event';
import { Course } from '../../entities/course.entity';

@EventsHandler(CourseSectionCreatedEvent)
export class IncrementCourseSectionsHandler implements IEventHandler<CourseSectionCreatedEvent> {
  async handle(event: CourseSectionCreatedEvent) {
    await Course.createQueryBuilder()
      .update(Course)
      .set({ sectionsCount: () => '"sectionsCount" + 1' })
      .where('id = :id', { id: event.courseId })
      .execute();
  }
}
