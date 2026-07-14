import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCourseCommand } from './create-course.command';
import { Course } from '../../../entities/course.entity';
import { Author } from '../../../../library/entities/author.entity';
import { CourseCategory } from '../../../entities/course-category.entity';
import { Language } from '../../../../common/entities/language.entity';
import { Difficulty } from '../../../../library/entities/difficulty.entity';
import { DoesNotExistException } from '../../../../../core/exceptions/does-not-exist.exception';

@CommandHandler(CreateCourseCommand)
export class CreateCourseHandler implements ICommandHandler<CreateCourseCommand> {
  async execute(cmd: CreateCourseCommand) {
    DoesNotExistException.ThrowIfNull(await Author.findOneBy({ id: cmd.authorId }), 'Author not found');
    DoesNotExistException.ThrowIfNull(await CourseCategory.findOneBy({ id: cmd.categoryId }), 'Category not found');
    DoesNotExistException.ThrowIfNull(await Language.findOneBy({ id: cmd.languageId }), 'Language not found');
    DoesNotExistException.ThrowIfNull(await Difficulty.findOneBy({ id: cmd.difficultyId }), 'Difficulty not found');

    const newCourse = Course.create({
      title: cmd.title,
      image: cmd.image,
      price: cmd.price,
      newPrice: cmd.newPrice,
      authorId: cmd.authorId,
      categoryId: cmd.categoryId,
      languageId: cmd.languageId,
      difficultyId: cmd.difficultyId,
    });

    return await Course.save(newCourse);
  }
}
