import {
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
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';
import { PurchaseCourseCommand } from './commands/purchase-course.command';
import { GetMyCoursesRequest } from './queries/get-my-courses.request';
import { GetMyCoursesResponse } from './queries/get-my-courses.response';
import { PaginatedResultDto } from '../../common/dtos/paginated-result.dto';
import { AuthGuard } from '@core/guards/auth.guard';
import { Roles } from '@core/decorators/roles.decorator';
import { UserType } from '@/enums/user-type.enum';

@Controller()
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class PurchasedCourseController {
  constructor(
    private cmdBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Post('courses/:id/purchase')
  @Roles(UserType.User, UserType.Admin)
  async purchase(
    @Param('id', ParseIntPipe) courseId: number,
    @Req() req: Request,
  ) {
    // @ts-ignore
    const userId = req.user.id;
    return await this.cmdBus.execute(
      new PurchaseCourseCommand(userId, courseId),
    );
  }

  @Get('my-courses')
  @Roles(UserType.User, UserType.Admin)
  @ApiOkResponse({ type: PaginatedResultDto(GetMyCoursesResponse) })
  async getMyCourses(
    @Query() filters: GetMyCoursesRequest,
    @Req() req: Request,
  ) {
    // @ts-ignore
    const userId = req.user.id;
    return await this.queryBus.execute(filters.toQuery(userId));
  }
}
