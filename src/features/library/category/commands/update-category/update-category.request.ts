import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { UpdateCategoryCommand } from './update-category.command';

export class UpdateCategoryRequest {
  @ApiProperty()
  @IsString()
  @MaxLength(64)
  @IsOptional()
  title: string;

  toCommand(id: number){
    return new UpdateCategoryCommand(id, this.title)
  }
}