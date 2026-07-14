import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString, MaxLength } from 'class-validator';
import { UpdateNewsCommand } from './update-news.command';

export class UpdateNewsRequest {
  @IsString()
  @MaxLength(256)
  @IsOptional()
  @ApiProperty({ required: false })
  title?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false,type: 'string', format: 'binary' })
  image?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  content?: string;

  @IsDateString()
  @IsOptional()
  @ApiProperty({ required: false })
  date?: Date;

  toCommand(id: number,image?: Express.Multer.File) {
    return new UpdateNewsCommand(id,this.title, image?.filename, this.content, this.date);
  }
}