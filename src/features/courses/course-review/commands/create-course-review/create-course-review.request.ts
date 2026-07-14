import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';
import { CreateCourseReviewCommand } from './create-course-review.command';

export class CreateCourseReviewRequest {
  @IsInt()
  @Min(1)
  @Max(5)
  @ApiProperty()
  rating: number;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  @ApiProperty({ required: false })
  comment?: string;

  toCommand(courseId: number, userId: number) {
    return new CreateCourseReviewCommand(courseId, userId, this.rating, this.comment);
  }
}
