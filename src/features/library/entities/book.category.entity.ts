import { Column, Entity } from 'typeorm';
import { BaseModel } from '../../../core/base.model';

@Entity('bookCategories')
export class BookCategory extends BaseModel {
  @Column({ length: 64, unique: true })
  title: string;
}
