export const asyncTask = (tasks: () => Promise<void>) => {
  tasks()
}