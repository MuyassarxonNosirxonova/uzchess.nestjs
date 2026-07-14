import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteCategoryCommand } from './delete-category.command';
import { BookCategory } from '../../../entities/book.category.entity';
import { DoesNotExistException } from '../../../../../core/exceptions/does-not-exist.exception';

@CommandHandler(DeleteCategoryCommand)
export class DeleteCategoryHandler implements ICommandHandler<DeleteCategoryCommand>{
  async execute(cmd: DeleteCategoryCommand){
    const category = await BookCategory.findOneBy({ id: cmd.id });
    DoesNotExistException.ThrowIfNull(category, 'Category with given id not found');

    await BookCategory.remove(category!);
    return { message: 'Category deleted successfully.' };
  }
}