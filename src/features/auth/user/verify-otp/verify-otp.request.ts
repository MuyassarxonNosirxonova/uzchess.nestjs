import {ApiProperty} from "@nestjs/swagger";
import {Allow, IsString, Length, MaxLength} from "class-validator";
import {VerifyOtpCommand} from "./verify-otp.command";

export class VerifyOtpRequest {
  @IsString()
  @MaxLength(96)
  @ApiProperty()
  username: string;

  @ApiProperty()
  @Length(6)
  code: string;

  @Allow()
  toCommand = () => new VerifyOtpCommand(this)
}