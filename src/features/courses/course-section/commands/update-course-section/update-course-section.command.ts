export class UpdateCourseSectionCommand {
  constructor(
    public id: number,
    public title?: string,
    public date?: Date,
    public order?: number,
  ) {}
}
