import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CourseController } from './course/course.controller';
import { CreateCourseHandler } from './course/commands/create-course/create-course.handler';
import { UpdateCourseHandler } from './course/commands/update-course/update-course.handler';
import { DeleteCourseHandler } from './course/commands/delete-course/delete-course.handler';
import { PublishCourseHandler } from './course/commands/publish-course/publish-course.handler';
import { GetAllCoursesHandler } from './course/queries/get-all-courses/get-all-course.handler';
import { GetOneCourseHandler } from './course/queries/get-one-course/get-one-course.handler';
import { CourseCategoryController } from './course-category/course-category.controller';
import { GetAllCourseCategoriesHandler } from './course-category/queries/get-all-course-categories.handler';
import { CreateCourseCategoryHandler } from './course-category/commands/create-course-category/create-course-category.handler';
import { UpdateCourseCategoryHandler } from './course-category/commands/update-course-category/update-course-category.handler';
import { DeleteCourseCategoryHandler } from './course-category/commands/delete-course-category/delete-course-category.handler';
import { CourseSectionController } from './course-section/create-course-section.controller';
import { CreateCourseSectionHandler } from './course-section/commands/create-course-section/create-course-section.handler';
import { UpdateCourseSectionHandler } from './course-section/commands/update-course-section/update-course-section.handler';
import { DeleteCourseSectionHandler } from './course-section/commands/delete-course-section/delete-course-section.handler';
import { GetCourseSectionsHandler } from './course-section/queries/get-course-sections/get-course-section.handler';
import { CourseLessonController } from './course-lesson/course-lesson.controller';
import { CreateCourseLessonHandler } from './course-lesson/commands/create-course-lesson/create-course-lesson.handler';
import { UpdateCourseLessonHandler } from './course-lesson/commands/update-course-lesson/update-course-lesson.handler';
import { DeleteCourseLessonHandler } from './course-lesson/commands/delete-course-lesson/delete-course-lesson.handler';
import { GetCourseLessonsHandler } from './course-lesson/queries/get-course-lessons/get-course-lesson.handler';
import { GetOneCourseLessonHandler } from './course-lesson/queries/get-one-course-lesson/get-one-course-lesson.handler';
import { PurchasedCourseController } from './purchased-course/purchased-course.controller';
import { PurchaseCourseHandler } from './purchased-course/commands/purchase-course.handler';
import { GetMyCoursesHandler } from './purchased-course/queries/get-my-courses.handler';
import { UserLessonController } from './user-lesson/user-lesson.controller';
import { UpdateLessonProgressHandler } from './user-lesson/commands/update-lesson/update-lesson-progress.handler';
import { CourseLikeController } from './course-like/course-like.controller';
import { CourseLikeHandler } from './course-like/commands/course-like.handler';
import { CourseReviewController } from './course-review/course-review.controller';
import { CreateCourseReviewHandler } from './course-review/commands/create-course-review/create-course-review.handler';
import { GetCourseReviewsHandler } from './course-review/queries/get-course-reviews/get-course-reviews.handler';
import { RecalculateCourseRatingHandler } from './course-review/events/handlers/recalculate-course-rating.handler';

@Module({
  imports: [CqrsModule],
  controllers: [
    CourseCategoryController,
    CourseController,
    CourseSectionController,
    CourseLessonController,
    PurchasedCourseController,
    UserLessonController,
    CourseLikeController,
    CourseReviewController
  ],
  providers: [
    CreateCourseHandler,
    UpdateCourseHandler,
    DeleteCourseHandler,
    PublishCourseHandler,
    GetAllCoursesHandler,
    GetOneCourseHandler,

    GetAllCourseCategoriesHandler,
    CreateCourseCategoryHandler,
    UpdateCourseCategoryHandler,
    DeleteCourseCategoryHandler,

    CreateCourseSectionHandler,
    UpdateCourseSectionHandler,
    DeleteCourseSectionHandler,
    GetCourseSectionsHandler,

    CreateCourseLessonHandler,
    UpdateCourseLessonHandler,
    DeleteCourseLessonHandler,
    GetCourseLessonsHandler,
    GetOneCourseLessonHandler,

    PurchaseCourseHandler,
    GetMyCoursesHandler,
    UpdateLessonProgressHandler,
    CourseLikeHandler,

    CreateCourseReviewHandler,
    GetCourseReviewsHandler,
    RecalculateCourseRatingHandler

  ],
})
export class CoursesModule {}
