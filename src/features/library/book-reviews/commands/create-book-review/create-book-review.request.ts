import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Max, MaxLength, Min } from 'class-validator';
import { CreateBookReviewCommand } from './create-book-review.command';

export class CreateBookReviewRequest {
  @IsInt()
  @Min(1)
  @Max(5)
  @ApiProperty()
  rating: number;

  @IsString()
  @IsOptional()
  @MaxLength(512)
  @ApiProperty({ required: false })
  comment?: string;

  toCommand(bookId: number, userId: number) {
    return new CreateBookReviewCommand(bookId, userId, this.rating, this.comment);
  }
}
