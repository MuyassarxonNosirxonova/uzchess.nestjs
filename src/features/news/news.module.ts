import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { NewsController } from './news.controller';
import { CreateNewsHandler } from './commands/create-news/create-news.handler';
import { UpdateNewsHandler } from './commands/update-news/update-news.handler';
import { DeleteNewsHandler } from './commands/delete-news/delete-news.handler';
import { GetAllNewsHandler } from './queries/get-all-news/get-all-news.handler';
import { GetOneNewsHandler } from './queries/get-one-news/get-one-news.handler';
import { GetNewsViewersHandler } from './news.view/news.view-queries/get-news-viewers.handler';
import {NewsViewHandler} from './news.view/news.view-commands/new-view.handler';
import {NewsViewController} from './news-view.controller';

@Module({
  imports: [CqrsModule],
  controllers: [NewsController,NewsViewController],
  providers: [
    CreateNewsHandler,
    UpdateNewsHandler,
    DeleteNewsHandler,
    GetAllNewsHandler,
    GetOneNewsHandler,
    GetNewsViewersHandler,
    NewsViewHandler

  ],
})
export class NewsModule {}