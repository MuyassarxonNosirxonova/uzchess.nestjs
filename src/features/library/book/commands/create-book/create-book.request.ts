import { ApiProperty } from '@nestjs/swagger';
import {
  Allow,
  IsDateString,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { CreateBookCommand } from './create-book.command';
import { Type } from 'class-transformer';

export class CreateBookRequest {
  @IsString()
  @MaxLength(128)
  @ApiProperty({required: false})
  title: string;

  @IsString()
  @ApiProperty({required: false})
  description: string;

  @Allow()
  @IsOptional()
  @ApiProperty({ required: false, type: 'string', format: 'binary' })
  image?: string;

  @IsNumber()
  @ApiProperty({required: false})
  @Type(() => Number)
  price: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  @Type(() => Number)
  newPrice?: number;

  @IsInt()
  @Min(1)
  @ApiProperty({ required: false })
  @Type(() => Number)
  pages: number;

  @IsDateString()
  @ApiProperty({ required: false })
  pubDate: Date;

  @IsInt()
  @ApiProperty({ required: false })
  @Type(() => Number)
  authorId: number;

  @IsInt()
  @ApiProperty({ required: false })
  @Type(() => Number)
  categoryId: number;

  @IsInt()
  @ApiProperty({ required: false })
  @Type(() => Number)
  difficultyId: number;

  @IsInt()
  @ApiProperty({ required: false })
  @Type(() => Number)
  languageId: number;

  @Allow()
  toCommand = (image?: Express.Multer.File) =>
    new CreateBookCommand(
      this.authorId,
      this.categoryId,
      this.languageId,
      this.difficultyId,
      this.title,
      this.description,
      this.price,
      this.pages,
      this.pubDate,
      image?.filename,
      this.newPrice,
    );
}