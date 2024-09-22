import { selector } from "recoil";
import { taskState } from "../atoms"; // Import task atom
import { Priority, Status } from "@/lib/types";

export const tasksByStatusState = selector({
  key: "tasksByStatusState",
  get: ({ get }) => {
    const tasks = get(taskState); // Get the current list of tasks
    return (status: Status) => tasks.filter(task => task.status === status);
  },
});

export const tasksByPriorityState = selector({
    key: "tasksByPriorityState",
    get: ({ get }) => {
      const tasks = get(taskState); // Get the current list of tasks
      return (priority: Priority) => tasks.filter(task => task.priority === priority);
    },
  });

  export const tasksSortedByDueDateState = selector({
    key: "tasksSortedByDueDateState",
    get: ({ get }) => {
      const tasks = get(taskState);
  
      // Sort by due date (earliest first). Undefined dates will appear at the end.
      return [...tasks].sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });
    },
  });

  export const tasksSortedByPriorityState = selector({
    key: "tasksSortedByPriorityState",
    get: ({ get }) => {
      const tasks = get(taskState);
  
      // Define the priority rank order
      const priorityOrder: Record<Priority, number> = {
        HIGH: 3,
        MEDIUM: 2,
        LOW: 1,
      };
  
      // Sort by priority (High to Low)
      return [...tasks].sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
    },
  });

  export const tasksSortedByStatusState = selector({
    key: "tasksSortedByStatusState",
    get: ({ get }) => {
      const tasks = get(taskState);
  
      // Define the status rank order
      const statusOrder: Record<Status, number> = {
        TO_DO: 1,
        IN_PROGRESS: 2,
        COMPLETED: 3,
      };
  
      // Sort by status (To Do to Completed)
      return [...tasks].sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
    },
  });