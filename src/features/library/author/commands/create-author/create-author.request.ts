import { Allow, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateAuthorCommand } from './create-author.command';

export class CreateAuthorRequest {
  @IsString()
  @MaxLength(64)
  @ApiProperty()
  fullName: string;

  @Allow()
  toCommand = () => new CreateAuthorCommand(this.fullName);
}
