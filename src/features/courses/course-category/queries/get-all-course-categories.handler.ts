import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllCourseCategoriesQuery } from './get-all-course-categories.query';
import { FindOptionsWhere, ILike } from 'typeorm';
import {CourseCategory} from '../../entities/course-category.entity';
import { plainToInstance } from 'class-transformer';
import { GetAllCourseCategoriesResponse } from './get-all-course-categories.response';
import {PaginatedResult} from '../../../common/dtos/paginated-result.dto';

@QueryHandler(GetAllCourseCategoriesQuery)
export class GetAllCourseCategoriesHandler implements IQueryHandler<GetAllCourseCategoriesQuery> {
  async execute(query: GetAllCourseCategoriesQuery) {
    const take = query.size ?? 10;
    const currentPage = query.page ?? 1;
    const skip = (currentPage - 1) * take;

    const where: FindOptionsWhere<CourseCategory> = {};
    if (query.search) where.title = ILike(`%${query.search}%`);

    const totalCount = await CourseCategory.countBy(where);
    const totalPages = Math.ceil(totalCount / take);
    const hasNext = currentPage < totalPages;
    const hasPrevious = currentPage > 1;

    const categories = await CourseCategory.find({ where, skip, take, order: { title: 'ASC' } });

    const data = plainToInstance(GetAllCourseCategoriesResponse, categories, { excludeExtraneousValues: true });
    return { totalCount, totalPages, currentPage, hasNext, hasPrevious, data } as PaginatedResult<GetAllCourseCategoriesResponse>;
  }
}