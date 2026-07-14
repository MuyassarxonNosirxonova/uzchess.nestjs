import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseModel } from '../../../core/base.model';
import { User } from '../../auth/entities/user.entity';
import { News } from './news.entity';

@Entity('news_views')
@Unique(['userId', 'newsId'])
export class NewsView extends BaseModel {
  @Column()
  userId: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  newsId: number;

  @ManyToOne(() => News, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'newsId' })
  news: News;

  @Column({ type: 'timestamp' })
  firstDate: Date;

  @Column({ type: 'timestamp' })
  lastDate: Date;

  @Column({ type: 'int', default: 1 })
  count: number;
}
