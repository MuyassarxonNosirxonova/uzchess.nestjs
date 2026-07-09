export class CreateNewsCommand {
  constructor(
    public title:string,
    public image:string,
    public content:string,
    public date:Date,
  ) {
  }
}