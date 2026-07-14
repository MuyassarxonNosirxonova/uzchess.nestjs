export class UpdateCourseCommand {
  constructor(
    public id: number,
    public title?: string,
    public image?: string,
    public price?: number,
    public newPrice?: number,
    public authorId?: number,
    public categoryId?: number,
    public languageId?: number,
    public difficultyId?: number,
  ) {}
}
