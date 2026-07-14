import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseModel } from '../../../core/base.model';
import { User } from '../../auth/entities/user.entity';
import { Course } from './course.entity';

@Entity('course_likes')
@Unique(['userId', 'courseId'])
export class CourseLike extends BaseModel {
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
}
