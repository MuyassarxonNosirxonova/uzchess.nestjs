import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateCourseSectionCommand } from './update-course-section.command';
import { CourseSection } from '../../../entities/course-section.entity';
import { DoesNotExistException } from '../../../../../core/exceptions/does-not-exist.exception';

@CommandHandler(UpdateCourseSectionCommand)
export class UpdateCourseSectionHandler implements ICommandHandler<UpdateCourseSectionCommand> {
  async execute(cmd: UpdateCourseSectionCommand) {
    const section = await CourseSection.findOneBy({ id: cmd.id });
    DoesNotExistException.ThrowIfNull(section, 'CourseSection with given id not found');

    if (cmd.title) section!.title = cmd.title;
    if (cmd.date) section!.date = cmd.date;
    if (cmd.order !== undefined) section!.order = cmd.order;

    return await CourseSection.save(section!);
  }
}
