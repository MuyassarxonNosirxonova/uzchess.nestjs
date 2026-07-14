import { IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UpdateDifficultyCommand } from './update-difficulty.command';

export class UpdateDifficultyRequest {
  @IsString()
  @MaxLength(32)
  @IsOptional()
  @ApiProperty({required: false})
  title?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({required: false,type:'string', format:'binary'})
  icon?: string;

  toCommand(id:number,icon?:Express.Multer.File){
    return new UpdateDifficultyCommand(id,this.title,icon?.filename);
  }
}