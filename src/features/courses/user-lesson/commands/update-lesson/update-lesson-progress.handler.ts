import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateLessonProgressCommand } from './update-lesson-progress.command';
import { UserLesson } from '../../../entities/user-lesson.entity';
import { CourseLesson } from '../../../entities/course-lesson.entity';
import { PurchasedCourse } from '../../../entities/purchased-course.entity';
import { DoesNotExistException } from '../../../../../core/exceptions/does-not-exist.exception';

@CommandHandler(UpdateLessonProgressCommand)
export class UpdateLessonProgressHandler implements ICommandHandler<UpdateLessonProgressCommand> {
  async execute(cmd: UpdateLessonProgressCommand) {
    const lesson = await CourseLesson.findOneBy({ id: cmd.courseLessonId });
    DoesNotExistException.ThrowIfNull(lesson, 'CourseLesson not found');

    let userLesson = await UserLesson.findOneBy({
      userId: cmd.userId,
      courseLessonId: cmd.courseLessonId,
    });

    if (!userLesson) {
      userLesson = UserLesson.create({ userId: cmd.userId, courseLessonId: cmd.courseLessonId });
    }

    if (cmd.stoppedAt !== undefined) userLesson.stoppedAt = cmd.stoppedAt;
    if (cmd.isCompleted !== undefined) userLesson.isCompleted = cmd.isCompleted;

    await UserLesson.save(userLesson);

    if (userLesson.isCompleted) {
      await this.checkAndMarkCourseCompleted(cmd.userId, lesson!.courseId);
    }

    return userLesson;
  }

  private async checkAndMarkCourseCompleted(userId: number, courseId: number) {
    const totalLessons = await CourseLesson.countBy({ courseId });

    const completedLessons = await UserLesson.createQueryBuilder('ul')
      .innerJoin(CourseLesson, 'cl', 'cl.id = ul.courseLessonId')
      .where('ul.userId = :userId', { userId })
      .andWhere('cl.courseId = :courseId', { courseId })
      .andWhere('ul.isCompleted = true')
      .getCount();

    if (totalLessons > 0 && completedLessons === totalLessons) {
      await PurchasedCourse.update({ userId, courseId }, { isCompleted: true });
    }
  }
}
