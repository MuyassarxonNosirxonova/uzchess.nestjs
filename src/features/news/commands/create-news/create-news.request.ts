import { BaseModel } from '../../../../core/base.model';
import { Allow, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateNewsCommand } from './create-news.command';

export class CreateNewsRequest extends BaseModel {
  @IsString()
  @MaxLength(256)
  @ApiProperty()
  title: string;

  @IsString()
  @MaxLength(128)
  @ApiProperty()
  image: string;

  @IsString()
  @ApiProperty()
  content: string;

  @ApiProperty()
  date: Date;

  @Allow()
  toCommand() {
    return new CreateNewsCommand(this.title,this.image,this.content,this.date)
  }
}