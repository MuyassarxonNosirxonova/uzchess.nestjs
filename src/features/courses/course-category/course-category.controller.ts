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
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { CreateCourseCategoryRequest } from './commands/create-course-category/create-course-category.request';
import { UpdateCourseCategoryRequest } from './commands/update-course-category/update-course-category.request';
import { DeleteCourseCategoryCommand } from './commands/delete-course-category/delete-course-category.command';
import { GetAllCourseCategoriesRequest } from './queries/get-all-course-categories.request';
import { GetAllCourseCategoriesResponse } from './queries/get-all-course-categories.response';
import { PaginatedResultDto } from '../../common/dtos/paginated-result.dto';
import { AuthGuard } from '../../../core/guards/auth.guard';
import { Roles } from '../../../core/decorators/roles.decorator';
import { UserType } from '@/enums/user-type.enum';

@Controller('course-categories')
@ApiBearerAuth()
export class CourseCategoryController {
  constructor(
    private cmdBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Get('list')
  @ApiOkResponse({ type: PaginatedResultDto(GetAllCourseCategoriesResponse) })
  async getAll(@Query() filters: GetAllCourseCategoriesRequest) {
    return await this.queryBus.execute(filters.toQuery());
  }

  @Post('create')
  @UseGuards(AuthGuard)
  @Roles(UserType.Admin)
  async create(@Body() payload: CreateCourseCategoryRequest) {
    return await this.cmdBus.execute(payload.toCommand());
  }

  @Patch('update/:id')
  @UseGuards(AuthGuard)
  @Roles(UserType.Admin)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCourseCategoryRequest,
  ) {
    return await this.cmdBus.execute(payload.toCommand(id));
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard)
  @Roles(UserType.Admin)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.cmdBus.execute(new DeleteCourseCategoryCommand(id));
  }
}