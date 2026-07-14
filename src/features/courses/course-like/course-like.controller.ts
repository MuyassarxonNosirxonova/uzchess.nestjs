import { Controller, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import type { Request } from 'express';
import { ApiBearerAuth } from '@nestjs/swagger';
import {CourseLikeCommand } from './commands/course-like.command';
import { AuthGuard } from '../../../core/guards/auth.guard';
import { Roles } from '../../../core/decorators/roles.decorator';
import { Role } from '../../../core/enums/role.enum';

@Controller('courses/:id/like')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class CourseLikeController {
  constructor(private cmdBus: CommandBus) {}

  @Post()
  @Roles(Role.User, Role.Admin)
  async toggle(@Param('id', ParseIntPipe) courseId: number, @Req() req: Request) {
    // @ts-ignore
    const userId = req.user.id;
    return await this.cmdBus.execute(new CourseLikeCommand(userId, courseId));
  }
}
