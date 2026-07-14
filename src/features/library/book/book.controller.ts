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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiConsumes, ApiOkResponse } from '@nestjs/swagger';
import { CreateBookRequest } from './commands/create-book/create-book.request';
import { UpdateBookRequest } from './commands/update-book/update-book.request';
import { DeleteBookCommand } from './commands/delete-book/delete-book.command';
import { PaginatedResultDto } from '../../common/dtos/paginated-result.dto';
import { AuthGuard } from '../../../core/guards/auth.guard';
import { Roles } from '../../../core/decorators/roles.decorator';
import { multerStorageOptions } from '../../../core/configs/multer.config';
import { GetAllBooksResponse } from './query/get-all-books/get-all-books.response';
import { GetAllBooksRequest } from './query/get-all-books/get-all-books.request';
import { GetOneBookResponse } from './query/get-one-book/get-one-book.response';
import { GetOneBookQuery } from './query/get-one-book/get-one-book.query';

@Controller('books')
@ApiBearerAuth()
export class BookController {
  constructor(
    private cmdBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Get('list')
  @ApiOkResponse({ type: PaginatedResultDto(GetAllBooksResponse) })
  async getAll(@Query() filters: GetAllBooksRequest) {
    return await this.queryBus.execute(filters.toQuery());
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneBookResponse })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.queryBus.execute(new GetOneBookQuery(id));
  }

  @Post('create')
  @UseGuards(AuthGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { storage: multerStorageOptions({
      destination: 'books',
      extensions: ['jpg'],
    }),
  }))
  async create(
    @Body() payload: CreateBookRequest,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return await this.cmdBus.execute(payload.toCommand(image));
  }

  @Patch('update/:id')
  @UseGuards(AuthGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { storage: multerStorageOptions }))
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateBookRequest,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return await this.cmdBus.execute(payload.toCommand(id, image));
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.cmdBus.execute(new DeleteBookCommand(id));
  }
}
