import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from '../../../core/base.model';
import { Author } from './author.entity';
import { Difficulty } from './difficulty.entity';
import { Language } from '../../common/entities/language.entity';
import { BookCategory } from './book.category.entity';

@Entity('books')
export class Book extends BaseModel {
  @Column({ length: 128 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ nullable: true })
  image?: string;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  price: number;


  @Column({ type: 'numeric', precision: 12, scale: 2, nullable: true })
  newPrice?: number;


  @Column({ type: 'numeric', precision: 2, scale: 1, nullable: true })
  rating?: number;

  @Column({ type: 'int', default: 0 })
  reviewsCount: number;

  @Column({ type: 'int' })
  pages: number;

  @Column({ type: 'date' })
  pubDate: Date;

  @Column()
  authorId: number;

  @ManyToOne(() => Author, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'authorId' })
  author: Author;

  @Column()
  categoryId: number;

  @ManyToOne(() => BookCategory, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'categoryId' })
  category: BookCategory;

  @Column()
  difficultyId: number;

  @ManyToOne(() => Difficulty, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'difficultyId' })
  difficulty: Difficulty;

  @Column()
  languageId: number;

  @ManyToOne(() => Language, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'languageId' })
  language: Language;
}
