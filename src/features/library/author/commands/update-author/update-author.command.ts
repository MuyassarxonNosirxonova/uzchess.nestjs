export class UpdateAuthorCommand {
  constructor(
    public id: number,
    public fullName?: string,
  ) {}
}
