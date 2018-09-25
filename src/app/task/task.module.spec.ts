import { TaskModule } from '@app/task/task.module';

describe('TaskModule', () => {
  let taskModule: TaskModule;

  beforeEach(() => {
    taskModule = new TaskModule();
  });

  it('should create an instance', () => {
    expect(taskModule).toBeTruthy();
  });
});
