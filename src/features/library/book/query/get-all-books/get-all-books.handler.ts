import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllBooksQuery } from './get-all-books.query';
import { FindOptionsWhere, ILike, MoreThanOrEqual } from 'typeorm';
import { Book } from '../../../entities/book.entity';
import { plainToInstance } from 'class-transformer';
import { GetAllBooksResponse } from './get-all-books.response';
import { PaginatedResult } from '../../../../common/dtos/paginated-result.dto';

@QueryHandler(GetAllBooksQuery)
export class GetAllBooksHandler implements IQueryHandler<GetAllBooksQuery> {
  async execute(query: GetAllBooksQuery) {
    const take = query.size ?? 10;
    const currentPage = query.page ?? 1;
    const skip = (currentPage - 1) * take;

    const where: FindOptionsWhere<Book> = {};
    if (query.search) where.title = ILike(`%${query.search}%`);
    if (query.categoryId) where.categoryId = query.categoryId;
    if (query.authorId) where.authorId = query.authorId;
    if (query.difficultyId) where.difficultyId = query.difficultyId;
    if (query.languageId) where.languageId = query.languageId;
    if (query.minRating !== undefined) where.rating = MoreThanOrEqual(query.minRating);

    const totalCount = await Book.countBy(where);
    const totalPages = Math.ceil(totalCount / take);
    const hasNext = currentPage < totalPages;
    const hasPrevious = currentPage > 1;

    const books = await Book.find({
      where,
      relations: {
        author:true,
        category:true,
        difficulty:true,
        language:true,
      },
      order: { createdAt: 'DESC' },
      skip,
      take,
    });

    const data = plainToInstance(GetAllBooksResponse, books, { excludeExtraneousValues: true });
    return { totalCount, totalPages, currentPage, hasNext, hasPrevious, data } as PaginatedResult<GetAllBooksResponse>;
  }
}
