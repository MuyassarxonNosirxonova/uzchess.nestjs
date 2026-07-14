import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteAuthorCommand } from './delete-author.command';
import { Author } from '../../../entities/author.entity';
import { DoesNotExistException } from '../../../../../core/exceptions/does-not-exist.exception';

@CommandHandler(DeleteAuthorCommand)
export class DeleteAuthorHandler implements ICommandHandler<DeleteAuthorCommand> {
  async execute(cmd: DeleteAuthorCommand) {
    const author = await Author.findOneBy({ id: cmd.id });
    DoesNotExistException.ThrowIfNull(author, 'Author with given id not found');

    await Author.remove(author!);
    return { message: `Author id ${cmd.id} deleted` };
  }
}
