import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, Req, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import type { Request } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateCourseReviewRequest } from './commands/create-course-review/create-course-review.request';
import { GetCourseReviewsRequest } from './queries/get-course-reviews/get-course-reviews.request';
import { AuthGuard } from '@core/guards/auth.guard';
import { Roles } from '@core/decorators/roles.decorator';
import {UserType} from '@/enums/user-type.enum';

@Controller('courses/:courseId/reviews')
@ApiBearerAuth()
export class CourseReviewController {
  constructor(
    private cmdBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Get()
  async getAll(
    @Param('courseId', ParseIntPipe) courseId: number,
    @Query() filters: GetCourseReviewsRequest,
  ) {
    return await this.queryBus.execute(filters.toQuery(courseId));
  }

  @Post()
  @UseGuards(AuthGuard)
  @Roles(UserType.User, UserType.Admin)
  async create(
    @Param('courseId', ParseIntPipe) courseId: number,
    @Body() payload: CreateCourseReviewRequest,
    @Req() req: Request,
  ) {
    // @ts-ignore
    const userId = req.user.id;
    return await this.cmdBus.execute(payload.toCommand(courseId, userId));
  }
}
