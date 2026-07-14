import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsDateString, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';
import { CreateCourseSectionCommand } from './create-course-section.command';

export class CreateCourseSectionRequest {
  @IsString()
  @MaxLength(256)
  @ApiProperty()
  title: string;

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  order?: number

  @IsDateString()
  @ApiProperty()
  date: Date;

  @Allow()
  toCommand = (courseId: number) => new CreateCourseSectionCommand(courseId, this.title, this.date, this.order);
}
