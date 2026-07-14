import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateCourseReviewCommand } from './create-course-review.command';
import { DoesNotExistException } from '../../../../../core/exceptions/does-not-exist.exception';
import { Course } from '../../../entities/course.entity';
import { CourseReview } from '../../../entities/course-review.entity';
import { ConflictException } from '@nestjs/common';
import { CourseReviewCreatedEvent } from '../../events/course-review.created.event';


@CommandHandler(CreateCourseReviewCommand)
export class CreateCourseReviewHandler implements ICommandHandler<CreateCourseReviewCommand> {
  constructor(private eventBus: EventBus) {}

  async execute(cmd: CreateCourseReviewCommand) {
    DoesNotExistException.ThrowIfNull(await Course.findOneBy({ id: cmd.courseId }), 'Course not found');

    const alreadyReviewed = await CourseReview.existsBy({ courseId: cmd.courseId, userId: cmd.userId });
    if (alreadyReviewed) throw new ConflictException("You have already rated this course.");

    const review = CourseReview.create({
      courseId: cmd.courseId,
      userId: cmd.userId,
      rating: cmd.rating,
      comment: cmd.comment,
    });
    await CourseReview.save(review);

    this.eventBus.publish(new CourseReviewCreatedEvent(cmd.courseId));
    return review;
  }
}
