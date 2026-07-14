import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { NewsViewEvent } from './news-view.event';
import { News } from '../../entities/news.entity';

@EventsHandler(NewsViewEvent)
export class IncrementNewsViewsCountHandler implements IEventHandler<NewsViewEvent> {
  async handle(event: NewsViewEvent) {
    await News.createQueryBuilder()
      .update(News)
      .set({ viewsCount: () => '"viewsCount" + 1' })
      .where('id = :id', { id: event.newsId })
      .execute();
  }
}
