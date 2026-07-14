import { Allow, IsInt, IsOptional, IsString, Max, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { GetAllCourseCategoriesQuery } from './get-all-course-categories.query';

export class GetAllCourseCategoriesRequest {
  @IsString()
  @MaxLength(32)
  @IsOptional()
  @ApiProperty({ required: false })
  search?: string;

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
  toQuery = () => new GetAllCourseCategoriesQuery(this.search, this.page, this.size);
}