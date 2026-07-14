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
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import type  { Request } from 'express';
import { ApiBearerAuth, ApiConsumes, ApiOkResponse } from '@nestjs/swagger';
import { CreateCourseRequest } from './commands/create-course/create-course.request';
import { UpdateCourseRequest } from './commands/update-course/update-course.request';
import { DeleteCourseCommand } from './commands/delete-course/delete-course.command';
import { PublishCourseCommand } from './commands/publish-course/publish-course.command';
import { GetOneCourseQuery } from './queries/get-one-course/get-one-course.query';
import { GetOneCourseResponse } from './queries/get-one-course/get-one-course.response';
import { PaginatedResultDto } from '../../common/dtos/paginated-result.dto';
import { AuthGuard } from '../../../core/guards/auth.guard';
import { Roles } from '../../../core/decorators/roles.decorator';
import { Role } from '../../../core/enums/role.enum';
import { multerStorageOptions } from '../../../core/configs/multer.config';
import { GetAllCoursesResponse } from './queries/get-all-courses/get-all-course.response';
import { GetAllCoursesRequest } from './queries/get-all-courses/get-all-course.request';

@Controller('courses')
@ApiBearerAuth()
export class CourseController {
  constructor(
    private cmdBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Get('list')
  @ApiOkResponse({ type: PaginatedResultDto(GetAllCoursesResponse) })
  async getAll(@Query() filters: GetAllCoursesRequest, @Req() req: Request) {
    // @ts-ignore
    const isAdmin = req.user?.role === Role.Admin || req.user?.role === Role.SuperAdmin;
    return await this.queryBus.execute(filters.toQuery(isAdmin));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneCourseResponse })
  async findOne(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    // @ts-ignore
    const isAdmin = req.user?.role === Role.Admin || req.user?.role === Role.SuperAdmin;
    // @ts-ignore
    const userId = req.user?.id;
    return await this.queryBus.execute(new GetOneCourseQuery(id, isAdmin, userId));
  }

  @Post('create')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { storage: multerStorageOptions({
      destination: 'course',
      extensions: ['jpg'],
    }), }))
  async create(
    @Body() payload: CreateCourseRequest,
    @UploadedFile() image: Express.Multer.File,
  ) {
    if (!image) throw new BadRequestException('image is required');
    return await this.cmdBus.execute(payload.toCommand(image));
  }

  @Patch('update/:id')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { storage: multerStorageOptions }))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCourseRequest,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return await this.cmdBus.execute(payload.toCommand(id, image));
  }

  @Patch('publish/:id')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  async publish(@Param('id', ParseIntPipe) id: number) {
    return await this.cmdBus.execute(new PublishCourseCommand(id));
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.cmdBus.execute(new DeleteCourseCommand(id));
  }
}
