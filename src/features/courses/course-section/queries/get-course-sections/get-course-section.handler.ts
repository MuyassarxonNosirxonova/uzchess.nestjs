import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetCourseSectionsQuery} from './get-course-section.query';
import { CourseSection } from '../../../entities/course-section.entity';
import { plainToInstance } from 'class-transformer';
import { GetCourseSectionsResponse } from './get-course-section.response';


@QueryHandler(GetCourseSectionsQuery)
export class GetCourseSectionsHandler implements IQueryHandler<GetCourseSectionsQuery> {
  async execute(query: GetCourseSectionsQuery) {

    const sections = await CourseSection.find({
      where: { courseId: query.courseId },
      order: { order: 'ASC' },
    });

    return plainToInstance(GetCourseSectionsResponse, sections, { excludeExtraneousValues: true });
  }
}
