import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import type { Request } from 'express';
import { ApiBearerAuth, ApiConsumes, ApiOkResponse } from '@nestjs/swagger';

import { CreateCourseLessonRequest } from './commands/create-course-lesson/create-course-lesson.request';
import { UpdateCourseLessonRequest } from './commands/update-course-lesson/update-course-lesson.request';
import { DeleteCourseLessonCommand } from './commands/delete-course-lesson/delete-course-lesson.command';
import { GetCourseLessonsQuery } from './queries/get-course-lessons/get-course-lesson.query';
import { GetCourseLessonsResponse } from './queries/get-course-lessons/get-course-lesson.response';
import { GetOneCourseLessonQuery } from './queries/get-one-course-lesson/get-one-course-lesson.query';
import { GetOneCourseLessonResponse } from './queries/get-one-course-lesson/get-one-course-lesson.response';
import { AuthGuard } from '@core/guards/auth.guard';
import { Roles } from '@core/decorators/roles.decorator';
import { multerStorageOptions } from '@core/configs/multer.config';
import { UserType } from '@/enums/user-type.enum';

const lessonFilesInterceptor = FileFieldsInterceptor(
  [
    { name: 'video', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 },
  ],
  {
    storage: multerStorageOptions({
      destination: 'video',
      extensions: ['mp4'],
    }),
  },
);

@Controller('courses/:courseId/lessons')
@ApiBearerAuth()
export class CourseLessonController {
  constructor(
    private cmdBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({ type: [GetCourseLessonsResponse] })
  async getAll(@Param('courseId', ParseIntPipe) courseId: number) {
    return await this.queryBus.execute(new GetCourseLessonsQuery(courseId));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneCourseLessonResponse })
  async findOne(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    // @ts-ignore
    const userId = req.user?.id;
    // @ts-ignore
    const isAdmin = req.user?.role === UserType.Admin || req.user?.role === UserType.SuperAdmin;

    return await this.queryBus.execute(
      new GetOneCourseLessonQuery(id, userId, isAdmin),
    );
  }

  @Post('create')
  @UseGuards(AuthGuard)
  @Roles(UserType.Admin)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(lessonFilesInterceptor)
  async create(
    @Param('courseId', ParseIntPipe) courseId: number,
    @Body() payload: CreateCourseLessonRequest,
    @UploadedFiles()
    files: { video?: Express.Multer.File[]; thumbnail?: Express.Multer.File[] },
  ) {
    const video = files.video?.[0];
    if (!video) throw new BadRequestException('video is required');

    return await this.cmdBus.execute(
      payload.toCommand(courseId, video, files.thumbnail?.[0]),
    );
  }

  @Patch('update/:id')
  @UseGuards(AuthGuard)
  @Roles(UserType.Admin)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(lessonFilesInterceptor)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCourseLessonRequest,
    @UploadedFiles()
    files: { video?: Express.Multer.File[]; thumbnail?: Express.Multer.File[] },
  ) {
    return await this.cmdBus.execute(
      payload.toCommand(id, files.video?.[0], files.thumbnail?.[0]),
    );
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard)
  @Roles(UserType.Admin)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.cmdBus.execute(new DeleteCourseLessonCommand(id));
  }
}
