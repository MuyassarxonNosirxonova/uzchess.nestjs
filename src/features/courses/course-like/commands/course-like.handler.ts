import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CourseLikeCommand } from './course-like.command';
import { DoesNotExistException } from '../../../../core/exceptions/does-not-exist.exception';
import { Course } from '../../entities/course.entity';
import { CourseLike } from '../../entities/course-like.entity';


@CommandHandler(CourseLikeCommand)
export class CourseLikeHandler implements ICommandHandler<CourseLikeCommand> {
  async execute(cmd: CourseLikeCommand) {
    DoesNotExistException.ThrowIfNull(await Course.findOneBy({ id: cmd.courseId }), 'Course not found');

    const existing = await CourseLike.findOneBy({ userId: cmd.userId, courseId: cmd.courseId });

    if (existing) {
      await CourseLike.remove(existing);
      return { liked: false };
    }

    const like = CourseLike.create({ userId: cmd.userId, courseId: cmd.courseId });
    await CourseLike.save(like);
    return { liked: true };
  }
}
