export class UpdateCourseLessonCommand {
  constructor(
    public id: number,
    public title?: string,
    public content?: string,
    public video?: string,
    public thumbnail?: string,
    public date?: Date,
    public order?: number,
    public isFree?: boolean,
    public courseSectionId?: number,
  ) {}
}
