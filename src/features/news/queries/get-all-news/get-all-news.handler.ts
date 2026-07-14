import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllNewsQuery } from './get-all-news.query';
import { FindOptionsWhere, ILike } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { News } from '../../entities/news.entity';
import { GetAllNewsResponse } from './get-all-news.response';
import { PaginatedResult } from '../../../common/dtos/paginated-result.dto';


@QueryHandler(GetAllNewsQuery)
export class GetAllNewsHandler implements IQueryHandler<GetAllNewsQuery> {
  async execute(query: GetAllNewsQuery) {
    const take = query.size ?? 10;
    const currentPage = query.page ?? 1;
    const skip = (currentPage - 1) * take;

    const where: FindOptionsWhere<News> = {};
    if (query.search) where.title = ILike(`%${query.search}%`);

    const totalCount = await News.countBy(where);
    const totalPages = Math.ceil(totalCount / take);
    const hasNext = currentPage < totalPages;
    const hasPrevious = currentPage > 1;

    const news = await News.find({
      where,
      order: { date: 'DESC' },
      skip,
      take,
    });

    const data = plainToInstance(GetAllNewsResponse, news, { excludeExtraneousValues: true });
    for (const item of data) {
      item.image = 'http://localhost:8000/uploads/' + item.image;
    }

    return { totalCount, totalPages, currentPage, hasNext, hasPrevious, data } as PaginatedResult<GetAllNewsResponse>;
  }
}