export class GetOneCourseQuery {
  constructor(
    public id: number,
    public isAdmin: boolean,
    public userId?: number,
  ) {}
}
