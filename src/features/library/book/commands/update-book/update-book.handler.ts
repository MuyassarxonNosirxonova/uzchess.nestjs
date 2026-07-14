import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateBookCommand } from './update-book.command';
import { Book } from '../../../entities/book.entity';
import { Author } from '../../../entities/author.entity';
import { Difficulty } from '../../../entities/difficulty.entity';
import { Language } from '../../../../common/entities/language.entity';
import { DoesNotExistException } from '../../../../../core/exceptions/does-not-exist.exception';
import { BookCategory } from '../../../entities/book.category.entity';

@CommandHandler(UpdateBookCommand)
export class UpdateBookHandler implements ICommandHandler<UpdateBookCommand> {
  async execute(cmd: UpdateBookCommand) {
    const book = await Book.findOneBy({ id: cmd.id });
    DoesNotExistException.ThrowIfNull(book, 'Book with given id not found');

    if (cmd.title) book!.title = cmd.title;
    if (cmd.description) book!.description = cmd.description;
    if (cmd.image !== undefined) book!.image = cmd.image;
    if (cmd.price !== undefined) book!.price = cmd.price;
    if (cmd.newPrice !== undefined) book!.newPrice = cmd.newPrice;
    if (cmd.pages !== undefined) book!.pages = cmd.pages;
    if (cmd.pubDate) book!.pubDate = cmd.pubDate;

    if (cmd.authorId) {
      DoesNotExistException.ThrowIfNull(await Author.findOneBy({ id: cmd.authorId }), 'Author not found');
      book!.authorId = cmd.authorId;
    }
    if (cmd.categoryId) {
      DoesNotExistException.ThrowIfNull(await BookCategory.findOneBy({ id: cmd.categoryId }), 'Category not found');
      book!.categoryId = cmd.categoryId;
    }
    if (cmd.difficultyId) {
      DoesNotExistException.ThrowIfNull(await Difficulty.findOneBy({ id: cmd.difficultyId }), 'Difficulty not found');
      book!.difficultyId = cmd.difficultyId;
    }
    if (cmd.languageId) {
      DoesNotExistException.ThrowIfNull(await Language.findOneBy({ id: cmd.languageId }), 'Language not found');
      book!.languageId = cmd.languageId;
    }

    return await Book.save(book!);
  }
}
