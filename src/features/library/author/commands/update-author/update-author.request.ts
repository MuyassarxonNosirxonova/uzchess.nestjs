import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { UpdateAuthorCommand } from './update-author.command';

export class UpdateAuthorRequest {
  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(64)
  @IsOptional()
  fullName?: string;

  toCommand(id: number) {
    return new UpdateAuthorCommand(id, this.fullName);
  }
}
