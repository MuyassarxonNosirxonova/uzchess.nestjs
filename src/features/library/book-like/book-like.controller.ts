import { Controller, Get, Param, ParseIntPipe, Post, Query, Req, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import type { Request } from 'express';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { PaginatedResultDto } from '../../common/dtos/paginated-result.dto';
import { AuthGuard } from '../../../core/guards/auth.guard';
import { Roles } from '../../../core/decorators/roles.decorator';
import { Role } from '../../../core/enums/role.enum';
import { BookLikeCommand } from './commands/book-like.command';
import { GetLikedBooksRequest } from './query/get-liked-books.request';
import { GetLikedBooksResponse } from './query/get-liked-books.response';


@Controller()
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class BookLikeController {
  constructor(
    private cmdBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Post('books/:id/like')
  @Roles(Role.User, Role.Admin)
  async toggle(@Param('id', ParseIntPipe) bookId: number, @Req() req: Request) {
    // @ts-ignore
    const userId = req.user.id;
    return await this.cmdBus.execute(new BookLikeCommand(userId, bookId));
  }

  @Get('liked-books')
  @Roles(Role.User, Role.Admin)
  @ApiOkResponse({ type: PaginatedResultDto(GetLikedBooksResponse) })
  async getMyLikedBooks(@Query() filters: GetLikedBooksRequest, @Req() req: Request) {
    // @ts-ignore
    const userId = req.user.id;
    return await this.queryBus.execute(filters.toQuery(userId));
  }
}