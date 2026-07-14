import { Column, Entity } from 'typeorm';
import { BaseModel } from '../../../core/base.model';

@Entity('news')
export class News extends BaseModel {
  @Column({ length: 256 })
  title: string;

  @Column()
  image: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column({ type: 'int', default: 0 })
  viewsCount: number;
}