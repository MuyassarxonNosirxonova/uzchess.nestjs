export class UpdateDifficultyCommand {
  constructor(
    public id : number,
    public title?: string,
    public icon?: string,
  ) {
  }
}