import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class GetAllNewsResponse {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  image: string;

  @ApiProperty()
  @Expose()
  date: Date;
}