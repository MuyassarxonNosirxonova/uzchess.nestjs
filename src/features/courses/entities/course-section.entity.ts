import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseModel } from '../../../core/base.model';
import { Course } from './course.entity';

@Entity('course_sections')
export class CourseSection extends BaseModel {
  @Column()
  courseId: number;

  @ManyToOne(() => Course, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'courseId' })
  course: Course;

  @Column({ length: 256 })
  title: string;

  @Column({ type: 'int', nullable: true })
  order?: number;

  @Column({ type: 'timestamp' })
  date: Date;
}
