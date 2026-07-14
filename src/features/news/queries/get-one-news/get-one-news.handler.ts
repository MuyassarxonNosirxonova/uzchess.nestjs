import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetOneNewsQuery } from './get-one-news.query';
import { plainToInstance } from 'class-transformer';
import { GetOneNewsResponse } from './get-one-news.response';
import { News } from '../../entities/news.entity';
import { DoesNotExistException } from '../../../../core/exceptions/does-not-exist.exception';

@QueryHandler(GetOneNewsQuery)
export class GetOneNewsHandler implements IQueryHandler<GetOneNewsQuery> {
  async execute(query: GetOneNewsQuery) {
    const news = await News.findOneBy({ id: query.id });
    DoesNotExistException.ThrowIfNull(news, 'News not found');

    return plainToInstance(GetOneNewsResponse, news, { excludeExtraneousValues: true });
  }
}