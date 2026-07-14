import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

class ReviewerRefDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  fullName: string;
}

export class GetCourseReviewsResponse {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  rating: number;

  @ApiProperty({ required: false })
  @Expose()
  comment?: string;

  @ApiProperty()
  @Expose()
  createdAt: string;

  @ApiProperty({ type: ReviewerRefDto })
  @Expose()
  @Type(() => ReviewerRefDto)
  user: ReviewerRefDto;
}
