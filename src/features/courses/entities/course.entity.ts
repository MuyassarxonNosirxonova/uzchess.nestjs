import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from '../../../core/base.model';
import { Author } from '../../library/entities/author.entity';
import { CourseCategory } from './course-category.entity';
import { Language } from '../../common/entities/language.entity';
import { Difficulty } from '../../library/entities/difficulty.entity';

@Entity('courses')
export class Course extends BaseModel {
  @Column({ length: 128 })
  title: string;

  @Column()
  image: string;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  price: number;

  @Column({ type: 'numeric', precision: 12, scale: 2, nullable: true })
  newPrice?: number;

  @Column({ default: false })
  isPublished: boolean;

  @Column({ type: 'numeric', precision: 2, scale: 1, nullable: true })
  rating?: number;

  @Column({ type: 'int', default: 0 })
  reviewsCount: number;

  @Column({ type: 'int', default: 0 })
  sectionsCount: number;

  @Column({ type: 'int', default: 0 })
  lessonsCount: number;

  @Column()
  authorId: number;

  @ManyToOne(() => Author, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'authorId' })
  author: Author;

  @Column()
  categoryId: number;

  @ManyToOne(() => CourseCategory, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'categoryId' })
  category: CourseCategory;

  @Column()
  languageId: number;

  @ManyToOne(() => Language, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'languageId' })
  language: Language;

  @Column()
  difficultyId: number;

  @ManyToOne(() => Difficulty, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'difficultyId' })
  difficulty: Difficulty;
}
