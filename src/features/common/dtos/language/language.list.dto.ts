import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LanguageListDto {
  @Expose()
  @ApiProperty({ required: false })
  id: number;

  @Expose()
  @ApiProperty({ required: false })
  title: string;

  @Expose()
  @ApiProperty({ required: false })
  code: string;
}
