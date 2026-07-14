import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsBoolean, IsDateString, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';
import { UpdateCourseLessonCommand } from './update-course-lesson.command';
import { Type } from 'class-transformer';
export class UpdateCourseLessonRequest {
  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  courseSectionId?: number;

  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(128)
  @IsOptional()
  title?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  content?: string;

  @Allow()
  @IsOptional()
  @ApiProperty({ required: false, type: 'string', format: 'binary' })
  video?: string;

  @Allow()
  @IsOptional()
  @ApiProperty({ required: false, type: 'string', format: 'binary' })
  thumbnail?: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  date?: Date;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  order?: number;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  isFree?: boolean;

  toCommand(id: number, video?: Express.Multer.File, thumbnail?: Express.Multer.File) {
    return new UpdateCourseLessonCommand(
      id, this.title, this.content, video?.filename, thumbnail?.filename ?? this.thumbnail,
      this.date, this.order, this.isFree, this.courseSectionId,
    );
  }
}
