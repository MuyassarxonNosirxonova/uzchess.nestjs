import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCourseCommand } from './update-course.command';
import { Course } from '../../../entities/course.entity';
import { Author } from '../../../../library/entities/author.entity';
import { CourseCategory } from '../../../entities/course-category.entity';
import { Language } from '../../../../common/entities/language.entity';
import { Difficulty } from '../../../../library/entities/difficulty.entity';
import { DoesNotExistException } from '../../../../../core/exceptions/does-not-exist.exception';

@CommandHandler(UpdateCourseCommand)
export class UpdateCourseHandler implements ICommandHandler<UpdateCourseCommand> {
  async execute(cmd: UpdateCourseCommand) {
    const course = await Course.findOneBy({ id: cmd.id });
    DoesNotExistException.ThrowIfNull(course, 'Course with given id not found');

    if (cmd.title) course!.title = cmd.title;
    if (cmd.image !== undefined) course!.image = cmd.image;
    if (cmd.price !== undefined) course!.price = cmd.price;
    if (cmd.newPrice !== undefined) course!.newPrice = cmd.newPrice;

    if (cmd.authorId) {
      DoesNotExistException.ThrowIfNull(await Author.findOneBy({ id: cmd.authorId }), 'Author not found');
      course!.authorId = cmd.authorId;
    }
    if (cmd.categoryId) {
      DoesNotExistException.ThrowIfNull(await CourseCategory.findOneBy({ id: cmd.categoryId }), 'Category not found');
      course!.categoryId = cmd.categoryId;
    }
    if (cmd.languageId) {
      DoesNotExistException.ThrowIfNull(await Language.findOneBy({ id: cmd.languageId }), 'Language not found');
      course!.languageId = cmd.languageId;
    }
    if (cmd.difficultyId) {
      DoesNotExistException.ThrowIfNull(await Difficulty.findOneBy({ id: cmd.difficultyId }), 'Difficulty not found');
      course!.difficultyId = cmd.difficultyId;
    }

    return await Course.save(course!);
  }
}
