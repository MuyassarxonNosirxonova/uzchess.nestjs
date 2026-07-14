import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BookLikeCommand } from './book-like.command';
import { DoesNotExistException } from '../../../../core/exceptions/does-not-exist.exception';
import { Book } from '../../entities/book.entity';
import { BookLike } from '../../entities/book-like.entity';

@CommandHandler(BookLikeCommand)
export class BookLikeHandler implements ICommandHandler<BookLikeCommand> {
  async execute(cmd: BookLikeCommand) {
    DoesNotExistException.ThrowIfNull(await Book.findOneBy({ id: cmd.bookId }), 'Book not found');

    const existing = await BookLike.findOneBy({ userId: cmd.userId, bookId: cmd.bookId });

    if (existing) {
      await BookLike.remove(existing);
      return { liked: false };
    }

    const like = BookLike.create({ userId: cmd.userId, bookId: cmd.bookId });
    await BookLike.save(like);
    return { liked: true };
  }
}
