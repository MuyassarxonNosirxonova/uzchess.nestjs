import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsDateString, IsInt, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { UpdateBookCommand } from './update-book.command';

export class UpdateBookRequest {
  @IsString()
  @MaxLength(128)
  @ApiProperty({ required: false })
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @Allow()
  @IsOptional()
  @ApiProperty({ required: false, type: 'string', format: 'binary' })
  image?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  price?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  newPrice?: number;


  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  pages?: number;

  @IsDateString()
  @IsOptional()
  @ApiProperty({ required: false })
  pubDate?: Date;

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  authorId?: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  categoryId?: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  difficultyId?: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  languageId?: number;

  toCommand(id: number, image?: Express.Multer.File) {
    return new UpdateBookCommand(
      id, this.title, this.description, image?.filename ?? this.image,
      this.price, this.newPrice, this.pages, this.pubDate,
      this.authorId, this.categoryId, this.difficultyId, this.languageId,
    );
  }
}
