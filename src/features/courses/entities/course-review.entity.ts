import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseModel } from '../../../core/base.model';
import { Course } from '../../courses/entities/course.entity';
import { User } from '../../auth/entities/user.entity';

@Entity('course_reviews')
@Unique(['courseId', 'userId'])
export class CourseReview extends BaseModel {
  @Column()
  courseId: number;

  @ManyToOne(() => Course, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'courseId' })
  course: Course;

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
