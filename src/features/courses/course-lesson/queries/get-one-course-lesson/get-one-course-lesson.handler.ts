import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOneCourseLessonQuery } from './get-one-course-lesson.query';
import { CourseLesson } from '../../../entities/course-lesson.entity';
import { PurchasedCourse } from '../../../entities/purchased-course.entity';
import { plainToInstance } from 'class-transformer';
import { GetOneCourseLessonResponse } from './get-one-course-lesson.response';
import { DoesNotExistException } from '../../../../../core/exceptions/does-not-exist.exception';
import { ForbiddenException } from '@nestjs/common';

@QueryHandler(GetOneCourseLessonQuery)
export class GetOneCourseLessonHandler implements IQueryHandler<GetOneCourseLessonQuery> {
  async execute(query: GetOneCourseLessonQuery) {
    const lesson = await CourseLesson.findOneBy({ id: query.id });
    DoesNotExistException.ThrowIfNull(lesson, 'CourseLesson not found');

    const hasAccess =
      lesson!.isFree ||
      query.isAdmin ||
      (query.userId
        ? await PurchasedCourse.existsBy({ userId: query.userId, courseId: lesson!.courseId })
        : false);

    if (!hasAccess) {
      throw new ForbiddenException("You need to purchase the course to watch this lesson.");
    }

    return plainToInstance(GetOneCourseLessonResponse, lesson, { excludeExtraneousValues: true });
  }
}
