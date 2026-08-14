import {ApiProperty} from "@nestjs/swagger";
import {Allow, IsString, Length, MaxLength} from "class-validator";
import {SetPasswordCommand} from "@/features/auth/user/set-password/set-password.command";

export class SetPasswordRequest {
  @IsString()
  @MaxLength(96)
  @ApiProperty()
  username: string;

  @IsString()
  @Length(6)
  @ApiProperty()
  code: string;

  @IsString()
  @MaxLength(32)
  @ApiProperty()
  password: string;

  @Allow()
  toCommand = () => new SetPasswordCommand(this);
}