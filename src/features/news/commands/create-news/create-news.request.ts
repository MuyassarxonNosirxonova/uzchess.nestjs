import { Allow, IsDateString, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateNewsCommand } from './create-news.command';

export class CreateNewsRequest {
  @IsString()
  @MaxLength(256)
  @ApiProperty()
  title: string;

  @Allow()
  @ApiProperty({ type: 'string', format: 'binary' })
  image: string;

  @IsString()
  @ApiProperty()
  content: string;

  @IsDateString()
  @ApiProperty()
  date: Date;

  @Allow()
  toCommand = (image: Express.Multer.File) =>
    new CreateNewsCommand(this.title, image.filename, this.content, this.date);
}