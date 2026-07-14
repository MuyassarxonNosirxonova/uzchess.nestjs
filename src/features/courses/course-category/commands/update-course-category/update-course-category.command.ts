export class UpdateCourseCategoryCommand {
  constructor(
    public id: number,
    public title?: string,
  ) {}
}