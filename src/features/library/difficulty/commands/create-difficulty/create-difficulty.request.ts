import { Allow, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateDifficultyCommand } from './create-difficulty.command';

export class CreateDifficultyRequest {
  @IsString()
  @MaxLength(32)
  @ApiProperty()
  title: string;

  @Allow()
  @ApiProperty()
  icon: string;

  @Allow()
  toCommand = (icon:Express.Multer.File) => new CreateDifficultyCommand(this.title,icon)
};