import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CourseReviewCreatedEvent } from '../course-review.created.event';
import { CourseReview } from '../../../entities/course-review.entity';
import { Course } from '../../../entities/course.entity';


@EventsHandler(CourseReviewCreatedEvent)
export class RecalculateCourseRatingHandler implements IEventHandler<CourseReviewCreatedEvent> {
  async handle(event: CourseReviewCreatedEvent) {
    const reviews = await CourseReview.findBy({ courseId: event.courseId });

    const reviewsCount = reviews.length;
    const rating = reviewsCount
      ? Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / reviewsCount) * 10) / 10
      : null;

    await Course.update({ id: event.courseId }, { rating: rating ?? undefined, reviewsCount });
  }
}
