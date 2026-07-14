import { Allow, IsInt, IsOptional, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { GetBookReviewsQuery } from './get-book-reviews-query';

export class GetBookReviewsRequest {
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
  toQuery = (bookId: number) => new GetBookReviewsQuery(bookId, this.page, this.size);
}
