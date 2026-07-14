import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseModel } from '../../../core/base.model';
import { Book } from '../../library/entities/book.entity';
import { User } from '../../auth/entities/user.entity';


@Entity('bookReviews')
@Unique(['bookId', 'userId'])
export class BookReview extends BaseModel {
  @Column()
  bookId: number;

  @ManyToOne(() => Book, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bookId' })
  book: Book;

  @Column()
  userId: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'int' })
  rating: number;

  @Column({ length: 512, nullable: true })
  comment?: string;
}
