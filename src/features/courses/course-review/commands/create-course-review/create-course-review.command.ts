export class CreateCourseReviewCommand {
  constructor(
    public courseId: number,
    public userId: number,
    public rating: number,
    public comment?: string,
  ) {}
}
