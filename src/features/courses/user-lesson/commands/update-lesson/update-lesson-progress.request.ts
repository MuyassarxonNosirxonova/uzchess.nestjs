import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional } from 'class-validator';
import { UpdateLessonProgressCommand } from './update-lesson-progress.command';

export class UpdateLessonProgressRequest {
  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  stoppedAt?: number;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean;

  toCommand(userId: number, courseLessonId: number) {
    return new UpdateLessonProgressCommand(userId, courseLessonId, this.stoppedAt, this.isCompleted);
  }
}
