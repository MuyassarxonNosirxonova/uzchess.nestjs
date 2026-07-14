import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetMyCoursesQuery } from './get-my-courses.query';
import { PurchasedCourse} from '../../entities/purchased-course.entity';
import { plainToInstance } from 'class-transformer';
import { GetMyCoursesResponse} from './get-my-courses.response';
import { PaginatedResult} from '../../../common/dtos/paginated-result.dto';

@QueryHandler(GetMyCoursesQuery)
export class GetMyCoursesHandler implements IQueryHandler<GetMyCoursesQuery> {
  async execute(query: GetMyCoursesQuery) {
    const take = query.size ?? 10;
    const currentPage = query.page ?? 1;
    const skip = (currentPage - 1) * take;

    const where = { userId: query.userId };

    const totalCount = await PurchasedCourse.countBy(where);
    const totalPages = Math.ceil(totalCount / take);
    const hasNext = currentPage < totalPages;
    const hasPrevious = currentPage > 1;

    const purchases = await PurchasedCourse.find({
      where,
      relations: {course:true},
      order: { date: 'DESC' },
      skip,
      take,
    });

    const data = plainToInstance(GetMyCoursesResponse, purchases, { excludeExtraneousValues: true });
    return { totalCount, totalPages, currentPage, hasNext, hasPrevious, data } as PaginatedResult<GetMyCoursesResponse>;
  }
}
