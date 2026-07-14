import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOneBookQuery } from './get-one-book.query';
import { Book } from '../../../entities/book.entity';
import { plainToInstance } from 'class-transformer';
import { GetOneBookResponse } from './get-one-book.response';
import { DoesNotExistException } from '../../../../../core/exceptions/does-not-exist.exception';

@QueryHandler(GetOneBookQuery)
export class GetOneBookHandler implements IQueryHandler<GetOneBookQuery> {
  async execute(query: GetOneBookQuery) {
    const book = await Book.findOne({
      where: { id: query.id },
      relations: {
        author:true,
        category:true,
        difficulty:true,
        language:true,
      },
    });
    DoesNotExistException.ThrowIfNull(book, 'Book not found');

    return plainToInstance(GetOneBookResponse, book, { excludeExtraneousValues: true });
  }
}
