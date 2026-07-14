import { Module } from '@nestjs/common';
import { CategoryController } from './category/category.controller';
import { LanguageController } from '../common/controllers/language.controller';
import { CreateAuthorHandler } from './author/commands/create-author/create-author.handler';
import { CreateCategoryHandler } from './category/commands/create-category/create-category.handler';
import { UpdateCategoryHandler } from './category/commands/update-category/update-category.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { GetAllCategoriesHandler } from './category/queries/get-all-categories/get-all-categories.handler';
import { DifficultyController } from './difficulty/difficulty.controller';
import { CreateDifficultyHandler } from './difficulty/commands/create-difficulty/create-difficulty.handler';
import { GetAllDifficultiesHandler } from './difficulty/query/get-all-difficulties/get-all-difficulties.handler';
import { UpdateDifficultyHandler } from './difficulty/commands/update-difficulty/update-difficulty.handler';
import { DeleteDifficultyHandler } from './difficulty/commands/delete-difficulty/delete-difficulty.handler';
import { DeleteCategoryHandler } from './category/commands/delete-category/delete-category.handler';
import { AuthorController } from './author/author.controller';
import { UpdateAuthorHandler } from './author/commands/update-author/update-author.handler';
import { DeleteAuthorHandler } from './author/commands/delete-author/delete-author.handler';
import { GetAllAuthorsHandler } from './author/queries/get-all-authors/get-all-authors.handler';
import { BookController } from './book/book.controller';
import { CreateBookHandler } from './book/commands/create-book/create-book.handler';
import { UpdateBookHandler } from './book/commands/update-book/update-book.handler';
import { DeleteBookHandler } from './book/commands/delete-book/delete-book.handler';
import { GetAllBooksHandler } from './book/query/get-all-books/get-all-books.handler';
import { GetOneBookHandler } from './book/query/get-one-book/get-one-book.handler';
import { BookLikeController } from './book-like/book-like.controller';
import { BookLikeHandler } from './book-like/commands/book-like.handler';
import { GetLikedBooksHandler } from './book-like/query/get-liked-books.handler';
import { BookReviewController } from './book-reviews/book-review.controller';
import { CreateBookReviewHandler } from './book-reviews/commands/create-book-review/create-book-review.handler';
import { GetBookReviewsHandler } from './book-reviews/queries/get-book-reviews/get-book-reviews-handler';
import { RecalculateBookRatingHandler } from './book-reviews/events/recalculate-book-rating.handler';

@Module({
  imports: [
    CqrsModule,
  ],
  controllers: [
    CategoryController,
    LanguageController,
    DifficultyController,
    AuthorController,
    BookController,
    BookLikeController,
    BookReviewController
  ],
  providers: [
    CreateCategoryHandler,
    CreateAuthorHandler,
    UpdateCategoryHandler,
    GetAllCategoriesHandler,
    CreateDifficultyHandler,
    GetAllDifficultiesHandler,
    UpdateDifficultyHandler,
    DeleteDifficultyHandler,
    DeleteCategoryHandler,
    CreateAuthorHandler,
    UpdateAuthorHandler,
    DeleteAuthorHandler,
    GetAllAuthorsHandler,
    CreateBookHandler,
    UpdateBookHandler,
    DeleteBookHandler,
    GetAllBooksHandler,
    GetOneBookHandler,
    BookLikeHandler,
    GetLikedBooksHandler,
    CreateBookReviewHandler,
    GetBookReviewsHandler,
    RecalculateBookRatingHandler,
  ],
})
export class LibraryModule {}
