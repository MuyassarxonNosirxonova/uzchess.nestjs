export class GetLikedBooksQuery{
  constructor(
    public userId: number,
    public page?: number,
    public size?: number,
  ) {}
}