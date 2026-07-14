export class UpdateLessonProgressCommand {
  constructor(
    public userId: number,
    public courseLessonId: number,
    public stoppedAt?: number,
    public isCompleted?: boolean,
  ) {}
}
