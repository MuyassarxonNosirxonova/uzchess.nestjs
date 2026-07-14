import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteCourseCategoryCommand } from './delete-course-category.command';
import { CourseCategory } from '../../../entities/course-category.entity';
import { DoesNotExistException } from '../../../../../core/exceptions/does-not-exist.exception';

@CommandHandler(DeleteCourseCategoryCommand)
export class DeleteCourseCategoryHandler implements ICommandHandler<DeleteCourseCategoryCommand> {
  async execute(cmd: DeleteCourseCategoryCommand) {
    const category = await CourseCategory.findOneBy({ id: cmd.id });
    DoesNotExistException.ThrowIfNull(category, 'CourseCategory with given id not found');

    await CourseCategory.remove(category!);
    return { message: `CourseCategory #${cmd.id} deleted` };
  }
}