export class CreateBookReviewCommand {
  constructor(
    public bookId: number,
    public userId: number,
    public rating: number,
    public comment?: string,
  ) {}
}
