import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { BaseModel } from '../../../core/base.model';
import { User } from '../../auth/entities/user.entity';
import { CourseLesson } from './course-lesson.entity';

@Entity('user_lessons')
@Unique(['userId', 'courseLessonId'])
export class UserLesson extends BaseModel {
  @Column()
  userId: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  courseLessonId: number;

  @ManyToOne(() => CourseLesson, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'courseLessonId' })
  courseLesson: CourseLesson;

  @Column({ type: 'int', nullable: true })
  stoppedAt?: number;

  @Column({ default: false })
  isCompleted: boolean;
}
