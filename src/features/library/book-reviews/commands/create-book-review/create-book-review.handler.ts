import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateBookReviewCommand } from './create-book-review.command';
import { DoesNotExistException } from '../../../../../core/exceptions/does-not-exist.exception';
import { Book } from '../../../entities/book.entity';
import { BookReview } from '../../../entities/book-review.entity';
import { ConflictException } from '@nestjs/common';
import { BookReviewCreatedEvent } from '../../events/book.review.created.event';

@CommandHandler(CreateBookReviewCommand)
export class CreateBookReviewHandler implements ICommandHandler<CreateBookReviewCommand> {
  constructor(private eventBus: EventBus) {}

  async execute(cmd: CreateBookReviewCommand) {
    DoesNotExistException.ThrowIfNull(await Book.findOneBy({ id: cmd.bookId }), 'Book not found');

    const alreadyReviewed = await BookReview.existsBy({ bookId: cmd.bookId, userId: cmd.userId });
    if (alreadyReviewed) throw new ConflictException("You have already rated this book.");

    const review = BookReview.create({
      bookId: cmd.bookId,
      userId: cmd.userId,
      rating: cmd.rating,
      comment: cmd.comment,
    });
    await BookReview.save(review);

    this.eventBus.publish(new BookReviewCreatedEvent(cmd.bookId));
    return review;
  }
}
