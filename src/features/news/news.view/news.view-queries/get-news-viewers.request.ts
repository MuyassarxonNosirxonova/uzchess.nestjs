import { Allow, IsInt, IsOptional, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { GetNewsViewersQuery } from './get-news.viewers.query';


export class GetNewsViewersRequest {
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
  toQuery = (newsId: number) => new GetNewsViewersQuery(newsId, this.page, this.size);
}
