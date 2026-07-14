import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

class BookRefDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty({ required: false })
  @Expose()
  image?: string;

  @ApiProperty()
  @Expose()
  price: number;

  @ApiProperty({ required: false })
  @Expose()
  newPrice?: number;
}

export class GetLikedBooksResponse {
  @ApiProperty({ type: BookRefDto })
  @Expose()
  @Type(() => BookRefDto)
  book: BookRefDto;
}
