import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOneCourseQuery } from './get-one-course.query';
import { Course } from '../../../entities/course.entity';
import { PurchasedCourse } from '../../../entities/purchased-course.entity';
import { plainToInstance } from 'class-transformer';
import { GetOneCourseResponse } from './get-one-course.response';
import { DoesNotExistException } from '../../../../../core/exceptions/does-not-exist.exception';

@QueryHandler(GetOneCourseQuery)
export class GetOneCourseHandler implements IQueryHandler<GetOneCourseQuery> {
  async execute(query: GetOneCourseQuery) {
    const course = await Course.findOne({
      where: { id: query.id },
      relations: {author:true,category:true,difficulty:true,language:true},
    });
    DoesNotExistException.ThrowIfNull(course, 'Course not found');

    if (!course!.isPublished && !query.isAdmin) {
      throw new DoesNotExistException('Course not found');
    }

    const isPurchased = query.userId
      ? await PurchasedCourse.existsBy({ userId: query.userId, courseId: query.id })
      : false;

    const response = plainToInstance(GetOneCourseResponse, course, { excludeExtraneousValues: true });
    response.isPurchased = isPurchased;
    return response;
  }
}
