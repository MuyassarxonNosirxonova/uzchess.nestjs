import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { AuthGuard } from '@core/guards/auth.guard';
import { Roles } from '@core/decorators/roles.decorator';
import { PaginatedResultDto } from '../common/dtos/paginated-result.dto';
import { GetNewsViewersResponse } from './news.view/news.view-queries/get-news-viewers.response';
import { GetNewsViewersRequest } from './news.view/news.view-queries/get-news-viewers.request';
import { UserType } from '@/enums/user-type.enum';

@Controller('news/:id/views')
@ApiBearerAuth()
export class NewsViewController {
  constructor(private queryBus: QueryBus) {}

  @Get()
  @UseGuards(AuthGuard)
  @Roles(UserType.User, UserType.Admin)
  @ApiOkResponse({ type: PaginatedResultDto(GetNewsViewersResponse) })
  async getViewers(
    @Param('id', ParseIntPipe) id: number,
    @Query() filters: GetNewsViewersRequest,
  ) {
    return await this.queryBus.execute(filters.toQuery(id));
  }
}