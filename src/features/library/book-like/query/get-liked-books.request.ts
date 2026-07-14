import { Allow, IsInt, IsOptional, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { GetLikedBooksQuery } from './get-liked-books.query';


export class GetLikedBooksRequest {
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
  toQuery = (userId: number) => new GetLikedBooksQuery(userId, this.page, this.size);
}
