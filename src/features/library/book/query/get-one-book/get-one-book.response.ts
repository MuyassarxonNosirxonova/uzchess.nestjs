import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

class RefDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  title: string;
}

class AuthorRefDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  fullName: string;
}

export class GetOneBookResponse {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  description: string;

  @ApiProperty({ required: false })
  @Expose()
  image?: string;

  @ApiProperty()
  @Expose()
  price: number;

  @ApiProperty({ required: false })
  @Expose()
  newPrice?: number;

  @ApiProperty({ required: false })
  @Expose()
  rating?: number;

  @ApiProperty()
  @Expose()
  reviewsCount: number;

  @ApiProperty()
  @Expose()
  pages: number;

  @ApiProperty()
  @Expose()
  pubDate: Date;

  @ApiProperty({ type: AuthorRefDto })
  @Expose()
  @Type(() => AuthorRefDto) author: AuthorRefDto;

  @ApiProperty({ type: RefDto })
  @Expose()
  @Type(() => RefDto) category: RefDto;

  @ApiProperty({ type: RefDto })
  @Expose()
  @Type(() => RefDto) difficulty: RefDto;

  @ApiProperty({ type: RefDto })
  @Expose()
  @Type(() => RefDto) language: RefDto;
}
