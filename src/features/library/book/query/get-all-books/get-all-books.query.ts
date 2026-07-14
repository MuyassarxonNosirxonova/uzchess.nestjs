export class GetAllBooksQuery {
  constructor(
    public search?: string,
    public categoryId?: number,
    public authorId?: number,
    public difficultyId?: number,
    public languageId?: number,
    public minRating?: number,
    public page?: number,
    public size?: number,
  ) {}
}
