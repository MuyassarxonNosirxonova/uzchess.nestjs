import { Allow, IsInt, IsOptional, IsString, Max, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { GetAllNewsQuery } from './get-all-news.query';

export class GetAllNewsRequest {
  @IsString()
  @MaxLength(64)
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
  toQuery = () => new GetAllNewsQuery(this.search, this.page, this.size);
}