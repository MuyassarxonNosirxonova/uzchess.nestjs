import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import type { Request } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UpdateLessonProgressRequest } from './commands/update-lesson/update-lesson-progress.request';
import { AuthGuard } from '@core/guards/auth.guard';
import { Roles } from '@core/decorators/roles.decorator';
import { UserType } from '@/enums/user-type.enum';

@Controller('course-lessons/:id/progress')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class UserLessonController {
  constructor(private cmdBus: CommandBus) {}

  @Patch()
  @Roles(UserType.User, UserType.Admin)
  async updateProgress(
    @Param('id', ParseIntPipe) courseLessonId: number,
    @Body() payload: UpdateLessonProgressRequest,
    @Req() req: Request,
  ) {
    // @ts-ignore
    const userId = req.user.id;
    return await this.cmdBus.execute(payload.toCommand(userId, courseLessonId));
  }
}
