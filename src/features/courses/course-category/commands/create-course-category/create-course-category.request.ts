import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsString, MaxLength } from 'class-validator';
import { CreateCourseCategoryCommand } from './create-course-category-command';


export class CreateCourseCategoryRequest {
  @IsString()
  @MaxLength(64)
  @ApiProperty()
  title: string;

  @Allow()
  toCommand = () => new CreateCourseCategoryCommand(this.title);
}