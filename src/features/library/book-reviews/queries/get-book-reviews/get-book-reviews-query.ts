export class GetBookReviewsQuery {
  constructor(
    public bookId: number,
    public page?: number,
    public size?: number,
  ) {}
}
