import { Allow, IsInt, IsOptional, IsString, Max, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { GetAllCoursesQuery } from './get-all-courses.query';

export class GetAllCoursesRequest {
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
  toQuery = (isAdmin: boolean) =>
    new GetAllCoursesQuery(
      isAdmin, this.search, this.categoryId, this.authorId,
      this.difficultyId, this.languageId, this.page, this.size,
    );
}
