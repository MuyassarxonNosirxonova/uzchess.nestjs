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
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import type { Request } from 'express';
import { ApiBearerAuth, ApiConsumes, ApiOkResponse } from '@nestjs/swagger';

import { CreateNewsRequest } from './commands/create-news/create-news.request';
import { UpdateNewsRequest } from './commands/update-news/update-news.request';
import { DeleteNewsCommand } from './commands/delete-news/delete-news.command';
import {NewsViewCommand} from './news.view/news.view-commands/news-view.command';
import { PaginatedResultDto } from '../common/dtos/paginated-result.dto';
import { AuthGuard } from '../../core/guards/auth.guard';
import { Roles } from '../../core/decorators/roles.decorator';
import { Role } from '../../core/enums/role.enum';
import { GetAllNewsResponse } from './queries/get-all-news/get-all-news.response';
import { GetAllNewsRequest } from './queries/get-all-news/get-all-news.request';
import { GetOneNewsResponse } from './queries/get-one-news/get-one-news.response';
import { GetOneNewsQuery } from './queries/get-one-news/get-one-news.query';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerStorageOptions } from '../../core/configs/multer.config';

@Controller('news')
@ApiBearerAuth()
export class NewsController {
  constructor(
    private cmdBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Get('list')
  @ApiOkResponse({ type: PaginatedResultDto(GetAllNewsResponse) })
  async getAll(@Query() filters: GetAllNewsRequest) {
    return await this.queryBus.execute(filters.toQuery());
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @Roles(Role.User, Role.Admin)
  @ApiOkResponse({ type: GetOneNewsResponse })
  async findOne(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const news = await this.queryBus.execute(new GetOneNewsQuery(id));

    // @ts-ignore
    const userId = req.user.id;
    await this.cmdBus.execute(new NewsViewCommand(id, userId));

    return news;
  }

  @Post('create')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: multerStorageOptions({
        destination: 'image',
        extensions: ['jpg'],
      }),
    }),
  )
  async create(
    @Body() payload: CreateNewsRequest,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return await this.cmdBus.execute(payload.toCommand(image));
  }

  @Patch('update/:id')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { storage: multerStorageOptions }))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateNewsRequest,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return await this.cmdBus.execute(payload.toCommand(id, image));
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.cmdBus.execute(new DeleteNewsCommand(id));
  }
}