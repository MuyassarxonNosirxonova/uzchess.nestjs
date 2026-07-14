export class GetAllCoursesQuery {
  constructor(
    public isAdmin: boolean,
    public search?: string,
    public categoryId?: number,
    public authorId?: number,
    public difficultyId?: number,
    public languageId?: number,
    public page?: number,
    public size?: number,
  ) {}
}
