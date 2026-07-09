import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LanguageCreateDto {
  @IsString()
  @MaxLength(64)
  @ApiProperty({ example: 'Uzbek', required: false })
  title: string;

  @IsString()
  @MaxLength(64)
  @ApiProperty({ required: false })
  code: string;
}
