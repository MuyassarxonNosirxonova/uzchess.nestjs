import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

class CourseRefDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  image: string;
}

export class GetMyCoursesResponse {
  @ApiProperty()
  @Expose()
  isCompleted: boolean;

  @ApiProperty()
  @Expose()
  date: Date;

  @ApiProperty({ type: CourseRefDto })
  @Expose()
  @Type(() => CourseRefDto)
  course: CourseRefDto;
}
