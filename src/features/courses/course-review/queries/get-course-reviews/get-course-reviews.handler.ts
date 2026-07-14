import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCourseReviewsQuery } from './get-course-reviews.query';
import { CourseReview} from '../../../entities/course-review.entity';
import { plainToInstance } from 'class-transformer';
import { GetCourseReviewsResponse } from './get-course-reviews.response';
import { PaginatedResult} from '../../../../common/dtos/paginated-result.dto';

@QueryHandler(GetCourseReviewsQuery)
export class GetCourseReviewsHandler implements IQueryHandler<GetCourseReviewsQuery> {
  async execute(query: GetCourseReviewsQuery) {
    const take = query.size ?? 10;
    const currentPage = query.page ?? 1;
    const skip = (currentPage - 1) * take;

    const where = { courseId: query.courseId };

    const totalCount = await CourseReview.countBy(where);
    const totalPages = Math.ceil(totalCount / take);
    const hasNext = currentPage < totalPages;
    const hasPrevious = currentPage > 1;

    const reviews = await CourseReview.find({
      where,
      relations: {user:true},
      order: { createdAt: 'DESC' },
      skip,
      take,
    });

    const data = plainToInstance(GetCourseReviewsResponse, reviews, { excludeExtraneousValues: true });
    return { totalCount, totalPages, currentPage, hasNext, hasPrevious, data } as PaginatedResult<GetCourseReviewsResponse>;
  }
}
