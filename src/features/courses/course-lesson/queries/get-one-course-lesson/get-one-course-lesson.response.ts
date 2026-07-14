import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class GetOneCourseLessonResponse {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty({ required: false })
  @Expose()
  content?: string;

  @ApiProperty({ required: false })
  @Expose()
  thumbnail?: string;

  @ApiProperty()
  @Expose()
  video: string;

  @ApiProperty()
  @Expose()
  isFree: boolean;
}
