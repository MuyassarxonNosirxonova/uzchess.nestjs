import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateBookCommand } from './create-book.command';
import { Book } from '../../../entities/book.entity';
import { Author } from '../../../entities/author.entity';
import { Difficulty } from '../../../entities/difficulty.entity';
import { Language } from '../../../../common/entities/language.entity';
import { DoesNotExistException } from '../../../../../core/exceptions/does-not-exist.exception';
import { BookCategory } from '../../../entities/book.category.entity';

@CommandHandler(CreateBookCommand)
export class CreateBookHandler implements ICommandHandler<CreateBookCommand> {
  async execute(cmd: CreateBookCommand) {
    DoesNotExistException.ThrowIfNull(await Author.findOneBy({ id: cmd.authorId }), 'Author not found');
    DoesNotExistException.ThrowIfNull(await BookCategory.findOneBy({ id: cmd.categoryId }), 'Category not found');
    DoesNotExistException.ThrowIfNull(await Difficulty.findOneBy({ id: cmd.difficultyId }), 'Difficulty not found');
    DoesNotExistException.ThrowIfNull(await Language.findOneBy({ id: cmd.languageId }), 'Language not found');

    const newBook = Book.create({
      title: cmd.title,
      description: cmd.description,
      image: cmd.image,
      price: cmd.price,
      newPrice: cmd.newPrice,
      pages: cmd.pages,
      pubDate: cmd.pubDate,
      authorId: cmd.authorId,
      categoryId: cmd.categoryId,
      difficultyId: cmd.difficultyId,
      languageId: cmd.languageId,
    });
    console.log('authorId:', cmd.authorId);
    console.log('categoryId:', cmd.categoryId);
    console.log('difficultyId:', cmd.difficultyId);
    console.log('languageId:', cmd.languageId);

    const category = await BookCategory.findOneBy({
      id: cmd.categoryId,
    });

    console.log('category:', category);
    return await Book.save(newBook);
  }
}
