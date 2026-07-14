import { ApiProperty } from '@nestjs/swagger';
import {
  Allow,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { CreateCourseCommand } from './create-course.command';
import { Type } from 'class-transformer';

export class CreateCourseRequest {
  @IsString()
  @MaxLength(128)
  @ApiProperty()
  title: string;

  @Allow()
  @ApiProperty({ type: 'string', format: 'binary' })
  image: string;

  @IsNumber()
  @ApiProperty()
  @Type(() => Number)
  price: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  @Type(() => Number)
  newPrice?: number;

  @IsInt()
  @ApiProperty()
  @Type(() => Number)
  authorId: number;

  @IsInt()
  @ApiProperty()
  @Type(() => Number)
  categoryId: number;

  @IsInt()
  @ApiProperty()
  @Type(() => Number)
  languageId: number;

  @IsInt()
  @ApiProperty()
  @Type(() => Number)
  difficultyId: number;

  @Allow()
  toCommand = (image: Express.Multer.File) =>
    new CreateCourseCommand(
      this.title,
      image.filename,
      this.price,
      this.authorId,
      this.categoryId,
      this.languageId,
      this.difficultyId,
      this.newPrice,
    );
}
