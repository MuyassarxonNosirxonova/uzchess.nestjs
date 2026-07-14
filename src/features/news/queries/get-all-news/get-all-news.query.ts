export class GetAllNewsQuery {
  constructor(
    public search?: string,
    public page?: number,
    public size?: number,
  ) {}
}