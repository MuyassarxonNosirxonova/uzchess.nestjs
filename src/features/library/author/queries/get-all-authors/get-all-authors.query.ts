export class GetAllAuthorsQuery {
  constructor(
    public search?: string,
    public page?: number,
    public size?: number,
  ) {}
}
