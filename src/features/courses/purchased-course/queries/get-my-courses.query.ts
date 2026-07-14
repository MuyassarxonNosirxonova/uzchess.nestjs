export class GetMyCoursesQuery {
  constructor(
    public userId: number,
    public page?: number,
    public size?: number,
  ) {}
}
