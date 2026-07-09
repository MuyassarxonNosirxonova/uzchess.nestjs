import { Module } from '@nestjs/common';
import { CategoryController } from './category/category.controller';
import { LanguageController } from '../common/controllers/language.controller';
import { CreateAuthorHandler } from './author/commands/create-author/create-author.handler';
import { CreateCategoryHandler } from './category/commands/create-category/create-category.handler';
import { UpdateCategoryHandler } from './category/commands/update-category/update-category.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { GetAllCategoriesHandler } from './category/queries/get-all-categories/get-all-categories.handler';

@Module({
  imports: [
    CqrsModule,
  ],
  controllers: [CategoryController, LanguageController],
  providers: [CreateCategoryHandler,CreateAuthorHandler,UpdateCategoryHandler,GetAllCategoriesHandler],
})
export class LibraryModule {}
