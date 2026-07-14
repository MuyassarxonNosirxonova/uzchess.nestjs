import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseModel } from '../../../core/base.model';
import { User } from '../../auth/entities/user.entity';
import { Book } from './book.entity';

@Entity('book_likes')
@Unique(['userId', 'bookId'])
export class BookLike extends BaseModel {
  @Column()
  userId: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  bookId: number;

  @ManyToOne(() => Book, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bookId' })
  book: Book;
}
