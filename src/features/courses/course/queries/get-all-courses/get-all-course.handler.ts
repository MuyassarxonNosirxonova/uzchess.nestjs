import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllCoursesQuery } from './get-all-courses.query';
import { FindOptionsWhere, ILike } from 'typeorm';
import { Course } from '../../../entities/course.entity';
import { plainToInstance } from 'class-transformer';
import { GetAllCoursesResponse} from './get-all-course.response';
import { PaginatedResult } from '../../../../common/dtos/paginated-result.dto';

@QueryHandler(GetAllCoursesQuery)
export class GetAllCoursesHandler implements IQueryHandler<GetAllCoursesQuery> {
  async execute(query: GetAllCoursesQuery) {
    const take = query.size ?? 10;
    const currentPage = query.page ?? 1;
    const skip = (currentPage - 1) * take;

    const where: FindOptionsWhere<Course> = {};
    if (query.search) where.title = ILike(`%${query.search}%`);
    if (query.categoryId) where.categoryId = query.categoryId;
    if (query.authorId) where.authorId = query.authorId;
    if (query.difficultyId) where.difficultyId = query.difficultyId;
    if (query.languageId) where.languageId = query.languageId;

    if (!query.isAdmin) where.isPublished = true;

    const totalCount = await Course.countBy(where);
    const totalPages = Math.ceil(totalCount / take);
    const hasNext = currentPage < totalPages;
    const hasPrevious = currentPage > 1;

    const courses = await Course.find({
      where,
      relations: {author:true,category:true,difficulty:true,language:true},
      order: { createdAt: 'ASC' },
      skip,
      take,
    });

    const data = plainToInstance(GetAllCoursesResponse, courses, { excludeExtraneousValues: true });
    return { totalCount, totalPages, currentPage, hasNext, hasPrevious, data } as PaginatedResult<GetAllCoursesResponse>;
  }
}
