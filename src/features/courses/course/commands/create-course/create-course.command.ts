export class CreateCourseCommand {
  constructor(
    public title: string,
    public image: string,
    public price: number,
    public authorId: number,
    public categoryId: number,
    public languageId: number,
    public difficultyId: number,
    public newPrice?: number,
  ) {}
}
