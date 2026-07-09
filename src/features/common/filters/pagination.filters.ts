import { IsInt, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationFilters {
  @IsInt()
  @IsOptional()
  @ApiProperty({required: false})
  page?: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({required: false})
  size?: number;
}