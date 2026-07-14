export class CreateCourseLessonCommand {
  constructor(
    public courseId: number,
    public courseSectionId: number,
    public title: string,
    public video: string,
    public date: Date,
    public content?: string,
    public thumbnail?: string,
    public order?: number,
    public isFree: boolean = false,
  ) {
  }
}