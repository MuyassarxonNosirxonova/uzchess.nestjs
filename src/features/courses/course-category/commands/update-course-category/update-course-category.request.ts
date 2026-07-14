import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { UpdateCourseCategoryCommand } from './update-course-category.command';

export class UpdateCourseCategoryRequest {
  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(64)
  @IsOptional()
  title?: string;

  toCommand(id: number) {
    return new UpdateCourseCategoryCommand(id, this.title);
  }
}