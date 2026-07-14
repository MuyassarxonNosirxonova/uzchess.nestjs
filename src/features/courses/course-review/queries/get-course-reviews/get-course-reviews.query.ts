export class GetCourseReviewsQuery {
  constructor(
    public courseId: number,
    public page?: number,
    public size?: number,
  ) {}
}
