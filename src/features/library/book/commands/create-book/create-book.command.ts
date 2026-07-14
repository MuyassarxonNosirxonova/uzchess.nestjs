export class CreateBookCommand {
  constructor(
    public authorId: number,
    public categoryId: number,
    public languageId: number,
    public difficultyId: number,
    public title: string,
    public description: string,
    public price: number,
    public pages: number,
    public pubDate: Date,
    public image?: string,
    public newPrice?: number,
  ) {}
}