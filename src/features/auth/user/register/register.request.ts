import {Allow, IsEnum, IsString, MaxLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {RegisterCommand} from "./register.command";
import {LoginType} from "@/features/auth/entities/user.entity";


export class RegisterRequest {
  @IsString()
  @MaxLength(96)
  @ApiProperty()
  username: string;

  @IsString()
  @MaxLength(64)
  @ApiProperty()
  fullName: string;

  @IsEnum(LoginType)
  @ApiProperty()
  loginType: LoginType;

  @Allow()
  toCommand = () => new RegisterCommand(this);

}