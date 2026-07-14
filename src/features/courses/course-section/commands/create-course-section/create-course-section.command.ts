export class CreateCourseSectionCommand {
  constructor(
    public courseId: number,
    public title: string,
    public date: Date,
    public order?: number,
  ) {}
}
