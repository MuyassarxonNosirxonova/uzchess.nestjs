import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class GetCourseLessonsResponse {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  courseSectionId: number;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty({ required: false })
  @Expose()
  thumbnail?: string;

  @ApiProperty({ required: false })
  @Expose()
  order?: number;

  @ApiProperty() @Expose() isFree: boolean;
}
