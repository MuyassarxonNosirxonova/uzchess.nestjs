export class GetOneCourseLessonQuery {
  constructor(
    public id: number,
    public userId?: number,
    public isAdmin: boolean = false,
  ) {}
}
