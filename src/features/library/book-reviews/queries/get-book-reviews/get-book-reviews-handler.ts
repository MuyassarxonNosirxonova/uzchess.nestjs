import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetBookReviewsQuery } from './get-book-reviews-query';
import { BookReview } from '../../../entities/book-review.entity';
import { plainToInstance } from 'class-transformer';
import { GetBookReviewsResponse } from './get-book-reviews-response';
import { PaginatedResult } from '../../../../common/dtos/paginated-result.dto';

@QueryHandler(GetBookReviewsQuery)
export class GetBookReviewsHandler implements IQueryHandler<GetBookReviewsQuery> {
  async execute(query: GetBookReviewsQuery) {
    const take = query.size ?? 10;
    const currentPage = query.page ?? 1;
    const skip = (currentPage - 1) * take;

    const where = { bookId: query.bookId };

    const totalCount = await BookReview.countBy(where);
    const totalPages = Math.ceil(totalCount / take);
    const hasNext = currentPage < totalPages;
    const hasPrevious = currentPage > 1;

    const reviews = await BookReview.find({
      where,
      relations: {user: true },
      order: { createdAt: 'DESC' },
      skip,
      take,
    });

    const data = plainToInstance(GetBookReviewsResponse, reviews, {
      excludeExtraneousValues: true,
    });
    return { totalCount, totalPages, currentPage, hasNext, hasPrevious, data } as PaginatedResult<GetBookReviewsResponse>;
  }
}
