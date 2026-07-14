import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteCourseCommand } from './delete-course.command';
import { Course } from '../../../entities/course.entity';
import { DoesNotExistException } from '../../../../../core/exceptions/does-not-exist.exception';

@CommandHandler(DeleteCourseCommand)
export class DeleteCourseHandler implements ICommandHandler<DeleteCourseCommand> {
  async execute(cmd: DeleteCourseCommand) {
    const course = await Course.findOneBy({ id: cmd.id });
    DoesNotExistException.ThrowIfNull(course, 'Course with given id not found');

    await Course.remove(course!);
    return { message: `Course id ${cmd.id} deleted` };
  }
}
