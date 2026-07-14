import { Allow, IsInt, IsNumber, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { GetAllBooksQuery } from './get-all-books.query';

export class GetAllBooksRequest {
  @IsString()
  @MaxLength(64)
  @IsOptional()
  @ApiProperty({ required: false })
  search?: string;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({ required: false })
  categoryId?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({ required: false })
  authorId?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({ required: false })
  difficultyId?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({ required: false })
  languageId?: number;

  @IsNumber()
  @Min(0) @Max(5)
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({ required: false })
  minRating?: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({ required: false })
  page?: number;

  @IsInt()
  @IsOptional()
  @Max(100)
  @Type(() => Number)
  @ApiProperty({ required: false })
  size?: number;

  @Allow()
  toQuery = () =>
    new GetAllBooksQuery(
      this.search, this.categoryId, this.authorId, this.difficultyId,
      this.languageId, this.minRating, this.page, this.size,
    );
}
