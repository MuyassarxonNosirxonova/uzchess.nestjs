import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from '../../../core/base.model';
import { Course } from './course.entity';
import { CourseSection } from './course-section.entity';

@Entity('course_lessons')
export class CourseLesson extends BaseModel {
  @Column()
  courseId: number;

  @ManyToOne(() => Course, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'courseId' })
  course: Course;

  @Column()
  courseSectionId: number;

  @ManyToOne(() => CourseSection, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'courseSectionId' })
  courseSection: CourseSection;

  @Column({ length: 128 })
  title: string;

  @Column({ type: 'text', nullable: true })
  content?: string;

  @Column({ nullable: true })
  thumbnail?: string;

  @Column()
  video: string;

  @Column({ type: 'int', nullable: true })
  order?: number;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column({ default: false })
  isFree: boolean;
}
