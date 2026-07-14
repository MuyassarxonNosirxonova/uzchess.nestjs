import { Allow, IsInt, IsOptional, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { GetCourseReviewsQuery } from './get-course-reviews.query';

export class GetCourseReviewsRequest {
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
  toQuery = (courseId: number) => new GetCourseReviewsQuery(courseId, this.page, this.size);
}
