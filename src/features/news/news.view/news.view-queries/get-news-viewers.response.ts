import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

class ViewerRefDto {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  fullName: string;
}

export class GetNewsViewersResponse {
  @ApiProperty({ type: ViewerRefDto })
  @Expose()
  @Type(() => ViewerRefDto)
  user: ViewerRefDto;

  @ApiProperty()
  @Expose()
  firstDate: Date;

  @ApiProperty()
  @Expose()
  lastDate: Date;

  @ApiProperty()
  @Expose()
  count: number;
}
