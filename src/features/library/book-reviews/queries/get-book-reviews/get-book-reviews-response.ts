import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

class ReviewAuthorDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  fullName: string;
}

export class GetBookReviewsResponse {
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

  @ApiProperty({ type: ReviewAuthorDto })
  @Expose()
  @Type(() => ReviewAuthorDto)
  user: ReviewAuthorDto;
}
