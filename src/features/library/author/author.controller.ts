import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateAuthorRequest } from './commands/create-author/create-author.request';
import { UpdateAuthorRequest } from './commands/update-author/update-author.request';
import { DeleteAuthorCommand } from './commands/delete-author/delete-author.command';
import { GetAllAuthorsRequest } from './queries/get-all-authors/get-all-authors.request';
import { GetAllAuthorsResponse } from './queries/get-all-authors/get-all-authors.response';
import { PaginatedResultDto } from '../../common/dtos/paginated-result.dto';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { AuthGuard } from '@core/guards/auth.guard';
import { Roles } from '@core/decorators/roles.decorator';
import { UserType } from '@/enums/user-type.enum';

@Controller('authors')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class AuthorController {
  constructor(
    private cmdBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Get('list')
  @ApiOkResponse({ type: PaginatedResultDto(GetAllAuthorsResponse) })
  async getAll(@Query() filters: GetAllAuthorsRequest) {
    return await this.queryBus.execute(filters.toQuery());
  }

  @Post('create')
  @Roles(UserType.Admin)
  async create(@Body() payload: CreateAuthorRequest) {
    return await this.cmdBus.execute(payload.toCommand());
  }

  @Patch('update/:id')
  @Roles(UserType.Admin)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateAuthorRequest,
  ) {
    return await this.cmdBus.execute(payload.toCommand(id));
  }

  @Delete('delete/:id')
  @Roles(UserType.Admin)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.cmdBus.execute(new DeleteAuthorCommand(id));
  }
}
