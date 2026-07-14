import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';
import { UpdateCourseSectionCommand } from './update-course-section.command';

export class UpdateCourseSectionRequest {
  @ApiProperty({ required: false }) @IsString() @MaxLength(256) @IsOptional() title?: string;
  @ApiProperty({ required: false }) @IsDateString() @IsOptional() date?: Date;
  @ApiProperty({ required: false }) @IsInt() @IsOptional() order?: number;

  toCommand(id: number) {
    return new UpdateCourseSectionCommand(id, this.title, this.date, this.order);
  }
}
