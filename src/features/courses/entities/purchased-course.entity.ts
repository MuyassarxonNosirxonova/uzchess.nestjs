import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseModel } from '../../../core/base.model';
import { User } from '../../auth/entities/user.entity';
import { Course } from './course.entity';

@Entity('purchased_courses')
@Unique(['userId', 'courseId'])
export class PurchasedCourse extends BaseModel {
  @Column()
  userId: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  courseId: number;

  @ManyToOne(() => Course, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'courseId' })
  course: Course;

  @Column({ default: false })
  isCompleted: boolean;

  @Column({ type: 'timestamp' })
  date: Date;
}
