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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllDifficultiesRequest } from './query/get-all-difficulties/get-all-difficulties.request';
import { ApiConsumes } from '@nestjs/swagger';
import { CreateDifficultyRequest } from './commands/create-difficulty/create-difficulty.request';
import { multerStorageOptions } from '../../../core/configs/multer.config';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateDifficultyRequest } from './commands/update-difficulty/update-difficulty.request';
import { DeleteDifficultyCommand } from './commands/delete-difficulty/delete-difficulty.command';

@Controller('difficulties')
export class DifficultyController {
  constructor(
    private cmdBus: CommandBus,
    private queryBus: QueryBus,
  ) {}
  @Get('list')
  async getAll(@Query() filters: GetAllDifficultiesRequest) {
    return await this.queryBus.execute(filters.toQuery());
  }
  @Post('create')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('icon', {
      storage: multerStorageOptions({
        destination: 'icons',
        extensions: ['svg'],
      }),
    }),
  )
  async create(
    @Body() payload: CreateDifficultyRequest,
    @UploadedFile() icon: Express.Multer.File,
  ) {
    return await this.cmdBus.execute(payload.toCommand(icon));
  }

  @Patch('update/:id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('icon', {
      storage: multerStorageOptions,
    }),
  )
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateDifficultyRequest,
    @UploadedFile() icon?: Express.Multer.File,
  ) {
    return await this.cmdBus.execute(payload.toCommand(id, icon));
  }

  @Delete('delete/:id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.cmdBus.execute(new DeleteDifficultyCommand(id));
  }
}
