export class UpdateBookCommand {
  constructor(
    public id: number,
    public title?: string,
    public description?: string,
    public image?: string,
    public price?: number,
    public newPrice?: number,
    public pages?: number,
    public pubDate?: Date,
    public authorId?: number,
    public categoryId?: number,
    public difficultyId?: number,
    public languageId?: number,
  ) {}
}
