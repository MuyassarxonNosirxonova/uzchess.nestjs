import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import type { Request } from 'express';
import { CreateBookReviewRequest } from './commands/create-book-review/create-book-review.request';
import { ApiBearerAuth } from '@nestjs/swagger';
import { GetBookReviewsRequest } from './queries/get-book-reviews/get-book-review.request';
import { AuthGuard } from '@core/guards/auth.guard';
import { Roles } from '@core/decorators/roles.decorator';
import { UserType } from '@/enums/user-type.enum';

@Controller('books/:bookId/reviews')
@ApiBearerAuth()
export class BookReviewController {
  constructor(
    private cmdBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Get()
  async getAll(
    @Param('bookId', ParseIntPipe) bookId: number,
    @Query() filters: GetBookReviewsRequest,
  ) {
    return await this.queryBus.execute(filters.toQuery(bookId));
  }

  @Post()
  @UseGuards(AuthGuard)
  @Roles(UserType.User, UserType.Admin)
  async create(
    @Param('bookId', ParseIntPipe) bookId: number,
    @Body() payload: CreateBookReviewRequest,
    @Req() req: Request,
  ) {
    // @ts-ignore
    const userId = req.user.id;
    return await this.cmdBus.execute(payload.toCommand(bookId, userId));
  }
}
