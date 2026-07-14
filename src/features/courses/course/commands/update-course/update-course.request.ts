import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsInt, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { UpdateCourseCommand } from './update-course.command';

export class UpdateCourseRequest {
  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(128)
  @IsOptional()
  title?: string;

  @Allow()
  @IsOptional()
  @ApiProperty({ required: false, type: 'string', format: 'binary' })
  image?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  newPrice?: number;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  authorId?: number;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  categoryId?: number;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  languageId?: number;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  difficultyId?: number;

  toCommand(id: number, image?: Express.Multer.File) {
    return new UpdateCourseCommand(
      id, this.title, image?.filename ?? this.image, this.price, this.newPrice,
      this.authorId, this.categoryId, this.languageId, this.difficultyId,
    );
  }
}
