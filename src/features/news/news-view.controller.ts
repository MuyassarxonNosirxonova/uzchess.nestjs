import { Controller, Get, Param, ParseIntPipe, Query, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { AuthGuard } from '../../core/guards/auth.guard';
import { Roles } from '../../core/decorators/roles.decorator';
import { Role } from '../../core/enums/role.enum';
import { PaginatedResultDto } from '../common/dtos/paginated-result.dto';
import {GetNewsViewersResponse} from './news.view/news.view-queries/get-news-viewers.response';
import { GetNewsViewersRequest } from './news.view/news.view-queries/get-news-viewers.request';

@Controller('news/:id/views')
@ApiBearerAuth()
export class NewsViewController {
  constructor(private queryBus: QueryBus) {}

  @Get()
  @UseGuards(AuthGuard)
  @Roles(Role.Admin,Role.User)
  @ApiOkResponse({ type: PaginatedResultDto(GetNewsViewersResponse) })
  async getViewers(
    @Param('id', ParseIntPipe) id: number,
    @Query() filters: GetNewsViewersRequest,
  ) {
    return await this.queryBus.execute(filters.toQuery(id));
  }
}