import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';

import { CreateCourseSectionRequest } from './commands/create-course-section/create-course-section.request';
import { UpdateCourseSectionRequest } from './commands/update-course-section/update-course-section.request';
import { DeleteCourseSectionCommand } from './commands/delete-course-section/delete-course-section.command';
import { GetCourseSectionsQuery} from './queries/get-course-sections/get-course-section.query';
import { GetCourseSectionsResponse} from './queries/get-course-sections/get-course-section.response';

import { AuthGuard } from '../../../core/guards/auth.guard';
import { Roles } from '../../../core/decorators/roles.decorator';
import { Role } from '../../../core/enums/role.enum';


@Controller('courses/:courseId/sections')
@ApiBearerAuth()
export class CourseSectionController {
  constructor(
    private cmdBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: [GetCourseSectionsResponse] })
  async getAll(@Param('courseId', ParseIntPipe) courseId: number) {
    return await this.queryBus.execute(new GetCourseSectionsQuery(courseId));
  }

  @Post('create')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  async create(
    @Param('courseId', ParseIntPipe) courseId: number,
    @Body() payload: CreateCourseSectionRequest,
  ) {
    return await this.cmdBus.execute(payload.toCommand(courseId));
  }

  @Patch('update/:id')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCourseSectionRequest,
  ) {
    return await this.cmdBus.execute(payload.toCommand(id));
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.cmdBus.execute(new DeleteCourseSectionCommand(id));
  }
}
