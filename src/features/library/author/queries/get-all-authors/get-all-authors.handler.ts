import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetAllAuthorsQuery } from './get-all-authors.query';
import { FindOptionsWhere, ILike } from 'typeorm';
import { Author } from '../../../entities/author.entity';
import { plainToInstance } from 'class-transformer';
import { PaginatedResult } from '../../../../common/dtos/paginated-result.dto';
import { GetAllAuthorsResponse } from './get-all-authors.response';
@QueryHandler(GetAllAuthorsQuery)
export class GetAllAuthorsHandler implements IQueryHandler<GetAllAuthorsQuery> {
  async execute(query: GetAllAuthorsQuery) {
    const take = query.size ?? 10;
    const currentPage = query.page ?? 1;
    const skip = (currentPage - 1) * take;

    const where: FindOptionsWhere<Author> = {};
    if (query.search) where.fullName = ILike(`%${query.search}%`);

    const totalCount = await Author.countBy(where);
    const totalPages = Math.ceil(totalCount / take);
    const hasNext = currentPage < totalPages;
    const hasPrevious = currentPage > 1;

    const authors = await Author.find({ where, skip, take, order: { createdAt: 'ASC' } });

    const data = plainToInstance(GetAllAuthorsResponse, authors, { excludeExtraneousValues: true });
    return { totalCount, totalPages, currentPage, hasNext, hasPrevious, data } as PaginatedResult<GetAllAuthorsResponse>;
  }
}
