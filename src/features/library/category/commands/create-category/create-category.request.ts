import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsString, MaxLength } from 'class-validator';
import { CreateCategoryCommand } from './create-category.command';

export class CreateCategoryRequest {
  @IsString()
  @MaxLength(64)
  @ApiProperty()
  title: string;

  @Allow()
  toCommand =() => new CreateCategoryCommand(this.title);

 }