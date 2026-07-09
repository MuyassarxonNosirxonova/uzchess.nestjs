import { BaseModel } from '../../../core/base.model';
import { Column, Entity } from 'typeorm';

@Entity('language')
export class Language extends BaseModel {
  @Column({ length: 64, unique: true })
  title: string;

  @Column({ length: 4, unique: true })
  code: string;
}
