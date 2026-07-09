import { IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LanguageUpdateDto {
  @IsString()
  @MaxLength(64)
  @IsOptional()
  @ApiProperty({ required: false })
  title?: string;

  @IsString()
  @MaxLength(64)
  @IsOptional()
  @ApiProperty({ required: false })
  code?: string;
}
