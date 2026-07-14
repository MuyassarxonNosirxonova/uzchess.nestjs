import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsBoolean, IsDateString, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';
import { CreateCourseLessonCommand } from './create-course-lesson.command';
import { Type } from 'class-transformer';

export class CreateCourseLessonRequest {
  @IsInt()
  @ApiProperty()
  @Type(() => Number)
  courseSectionId: number;

  @IsString()
  @MaxLength(128)
  @ApiProperty()
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  content?: string;

  @Allow()
  @ApiProperty({ type: 'string', format: 'binary' })
  video: string;

  @Allow()
  @IsOptional()
  @ApiProperty({ required: false, type: 'string', format: 'binary' })
  thumbnail?: string;

  @IsDateString()
  @ApiProperty()
  date: Date;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({ required: false })
  order?: number;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  @ApiProperty({ required: false, default: false })
  isFree?: boolean;

  @Allow()
  toCommand = (courseId: number, video: Express.Multer.File, thumbnail?: Express.Multer.File) =>
    new CreateCourseLessonCommand(
      courseId, this.courseSectionId, this.title, video.filename, this.date,
      this.content, thumbnail?.filename, this.order, this.isFree ?? false,
    );
}
