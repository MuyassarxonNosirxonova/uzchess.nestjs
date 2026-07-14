export class UpdateNewsCommand {
  constructor(
    public id: number,
    public title?: string,
    public image?: string,
    public content?: string,
    public date?: Date,
  ) {}
}