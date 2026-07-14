import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetNewsViewersResponse } from './get-news-viewers.response';
import { PaginatedResult } from '../../../common/dtos/paginated-result.dto';
import { GetNewsViewersQuery } from './get-news.viewers.query';
import { NewsView } from '../../entities/news.view.entity';

@QueryHandler(GetNewsViewersQuery)
export class GetNewsViewersHandler implements IQueryHandler<GetNewsViewersQuery> {
  async execute(query: GetNewsViewersQuery) {
    const take = query.size ?? 10;
    const currentPage = query.page ?? 1;
    const skip = (currentPage - 1) * take;

    const where = { newsId: query.newsId };

    const totalCount = await NewsView.countBy(where);
    const totalPages = Math.ceil(totalCount / take);
    const hasNext = currentPage < totalPages;
    const hasPrevious = currentPage > 1;

    const views = await NewsView.find({
      where,
      relations: {user: true },
      order: { lastDate: 'DESC' },
      skip,
      take,
    });

    const data = plainToInstance(GetNewsViewersResponse, views, { excludeExtraneousValues: true });
    return { totalCount, totalPages, currentPage, hasNext, hasPrevious, data } as PaginatedResult<GetNewsViewersResponse>;
  }
}
