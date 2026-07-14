export class GetAllCourseCategoriesQuery {
  constructor(
    public search?: string,
    public page?: number,
    public size?: number,
  ) {}
}