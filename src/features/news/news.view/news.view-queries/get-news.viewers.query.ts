export class GetNewsViewersQuery {
  constructor(
    public newsId: number,
    public page?: number,
    public size?: number,
  ) {}
}
