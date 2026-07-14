import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCourseLessonsQuery} from './get-course-lesson.query';
import { CourseLesson } from '../../../entities/course-lesson.entity';
import { plainToInstance } from 'class-transformer';
import { GetCourseLessonsResponse } from './get-course-lesson.response';


@QueryHandler(GetCourseLessonsQuery)
export class GetCourseLessonsHandler implements IQueryHandler<GetCourseLessonsQuery> {
  async execute(query: GetCourseLessonsQuery) {
    const lessons = await CourseLesson.find({
      where: { courseId: query.courseId },
      order: { order: 'ASC' },
    });

    return plainToInstance(GetCourseLessonsResponse, lessons, { excludeExtraneousValues: true });
  }
}
