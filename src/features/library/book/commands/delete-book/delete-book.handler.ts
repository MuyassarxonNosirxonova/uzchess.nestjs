import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteBookCommand } from './delete-book.command';
import { Book } from '../../../entities/book.entity';
import { DoesNotExistException } from '../../../../../core/exceptions/does-not-exist.exception';

@CommandHandler(DeleteBookCommand)
export class DeleteBookHandler implements ICommandHandler<DeleteBookCommand> {
  async execute(cmd: DeleteBookCommand) {
    const book = await Book.findOneBy({ id: cmd.id });
    DoesNotExistException.ThrowIfNull(book, 'Book with given id not found');

    await Book.remove(book!);
    return { message: `Book id ${cmd.id} deleted` };
  }
}
