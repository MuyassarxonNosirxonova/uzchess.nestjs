import { Allow, IsInt, IsOptional, IsString, Max, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { GetAllAuthorsQuery } from './get-all-authors.query';
import { Type } from 'class-transformer';

export class GetAllAuthorsRequest {
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
  toQuery = () => new GetAllAuthorsQuery(this.search, this.page, this.size);
}
