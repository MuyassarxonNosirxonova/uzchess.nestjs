import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { BookReview } from '../../entities/book-review.entity';
import { BookReviewCreatedEvent } from './book.review.created.event';
import { Book } from '../../../library/entities/book.entity';


@EventsHandler(BookReviewCreatedEvent)
export class RecalculateBookRatingHandler implements IEventHandler<BookReviewCreatedEvent> {
  async handle(event: BookReviewCreatedEvent) {
    const reviews = await BookReview.findBy({ bookId: event.bookId });

    const reviewsCount = reviews.length;
    const rating = reviewsCount
      ? Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / reviewsCount) * 10) / 10
      : null;

    await Book.update({ id: event.bookId }, { rating: rating ?? undefined, reviewsCount });
  }
}
