import { Allow, IsInt, IsOptional, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { GetMyCoursesQuery } from './get-my-courses.query';

export class GetMyCoursesRequest {
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
  toQuery = (userId: number) => new GetMyCoursesQuery(userId, this.page, this.size);
}
