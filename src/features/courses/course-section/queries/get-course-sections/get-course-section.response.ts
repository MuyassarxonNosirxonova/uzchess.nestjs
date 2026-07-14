import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class GetCourseSectionsResponse {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty({ required: false })
  @Expose()
  order?: number;

  @ApiProperty()
  @Expose()
  date: Date;
}
