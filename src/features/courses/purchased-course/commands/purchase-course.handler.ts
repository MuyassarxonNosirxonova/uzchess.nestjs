import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PurchaseCourseCommand } from './purchase-course.command';
import { Course} from '../../entities/course.entity';
import { PurchasedCourse} from '../../entities/purchased-course.entity';
import { DoesNotExistException} from '../../../../core/exceptions/does-not-exist.exception';
import { BadRequestException, ConflictException } from '@nestjs/common';

@CommandHandler(PurchaseCourseCommand)
export class PurchaseCourseHandler implements ICommandHandler<PurchaseCourseCommand> {
  async execute(cmd: PurchaseCourseCommand) {
    const course = await Course.findOneBy({ id: cmd.courseId });
    DoesNotExistException.ThrowIfNull(course, 'Course not found');

    if (!course!.isPublished) {
      throw new BadRequestException("This course has not yet been published and cannot be purchased.");
    }

    const alreadyPurchased = await PurchasedCourse.existsBy({ userId: cmd.userId, courseId: cmd.courseId });
    if (alreadyPurchased) {
      throw new ConflictException('You have already purchased this course.');
    }
    const purchase = PurchasedCourse.create({
      userId: cmd.userId,
      courseId: cmd.courseId,
      isCompleted: false,
      date: new Date(),
    });

    return await PurchasedCourse.save(purchase);
  }
}
