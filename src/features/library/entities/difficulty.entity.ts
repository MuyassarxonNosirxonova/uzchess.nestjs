import { Column, Entity } from 'typeorm';
import { BaseModel } from '../../../core/base.model';

@Entity('difficulties')
export class Difficulty extends BaseModel{
  @Column({ length: 32,unique: true })
  title: string;

  @Column({ length: 256 })
  icon:string;
}