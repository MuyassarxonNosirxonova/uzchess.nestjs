import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { NewsViewCommand } from './news-view.command';
import { DoesNotExistException } from '../../../../core/exceptions/does-not-exist.exception';
import { News } from '../../entities/news.entity';
import { NewsView } from '../../entities/news.view.entity';
import { NewsViewEvent } from '../Events/news-view.event';

const ONE_HOUR_MS = 60 * 60 * 1000;

@CommandHandler(NewsViewCommand)
export class NewsViewHandler implements ICommandHandler<NewsViewCommand> {
  constructor(private eventBus: EventBus) {}

  async execute(cmd: NewsViewCommand) {
    DoesNotExistException.ThrowIfNull(await News.findOneBy({ id: cmd.newsId }), 'News not found');

    const now = new Date();
    const existing = await NewsView.findOneBy({ userId: cmd.userId, newsId: cmd.newsId });


    if (!existing) {
      const view = NewsView.create({
        userId: cmd.userId,
        newsId: cmd.newsId,
        firstDate: now,
        lastDate: now,
        count: 1,
      });
      await NewsView.save(view);

      this.eventBus.publish(new NewsViewEvent(cmd.newsId));
      return view;
    }
    const elapsed = now.getTime() - existing.lastDate.getTime();
    if (elapsed >= ONE_HOUR_MS) {
      existing.count += 1;
      existing.lastDate = now;
      await NewsView.save(existing);

      this.eventBus.publish(new NewsViewEvent(cmd.newsId));
    }

    return existing;
  }
}
