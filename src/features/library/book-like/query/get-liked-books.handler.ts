import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetLikedBooksQuery } from './get-liked-books.query';
import { BookLike } from '../../entities/book-like.entity';
import { plainToInstance } from 'class-transformer';
import { PaginatedResult } from '../../../common/dtos/paginated-result.dto';

@QueryHandler(GetLikedBooksQuery)
export class GetLikedBooksHandler implements IQueryHandler<GetLikedBooksQuery> {
  async execute(query: GetLikedBooksQuery) {
    const take = query.size ?? 10;
    const currentPage = query.page ?? 1;
    const skip = (currentPage - 1) * take;

    const where = { userId: query.userId };

    const totalCount = await BookLike.countBy(where);
    const totalPages = Math.ceil(totalCount / take);
    const hasNext = currentPage < totalPages;
    const hasPrevious = currentPage > 1;

    const likes = await BookLike.find({
      where,
      relations: { book: true } ,
      order: { createdAt: 'DESC' },
      skip,
      take,
    });

    const data = plainToInstance(GetLikedBooksQuery, likes, { excludeExtraneousValues: true });
    return { totalCount, totalPages, currentPage, hasNext, hasPrevious, data } as PaginatedResult<GetLikedBooksQuery>;
  }
}
