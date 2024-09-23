import { selector } from "recoil";
import { taskState, searchTermState, filterStatusState, filterPriorityState, sortByState, sortDirectionState } from "../atoms";
import { Priority, Status, Task } from "@/lib/types";

export const filteredAndSortedTasksState = selector({
  key: "filteredAndSortedTasksState",
  get: ({ get }) => {
    const tasks:Task[] = get(taskState); // Get the current list of tasks
    const searchTerm:string = get(searchTermState); // Get search term from state
    const filterStatus = get(filterStatusState); // Get filter status from state
    const filterPriority = get(filterPriorityState); // Get filter priority from state
    const sortBy = get(sortByState); // Get sorting option from state
    const sortDirection = get(sortDirectionState); // Get sorting direction from state

    // Filter tasks
    const filteredTasks = tasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === "all" || task.status === filterStatus;
      const matchesPriority = filterPriority === "all" || task.priority === filterPriority;
      return matchesSearch && matchesStatus && matchesPriority;
    });

    // Sort tasks
    const sortedTasks = [...filteredTasks].sort((a, b) => {
      if (a.status === "COMPLETED" && b.status !== "COMPLETED") return 1;
      if (a.status !== "COMPLETED" && b.status === "COMPLETED") return -1;
      if (sortBy === "title") {
        return sortDirection === "asc"
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      } else if (sortBy === "dueDate") {
        const dateA = a.dueDate ? new Date(a.dueDate).getTime() : 0;
        const dateB = b.dueDate ? new Date(b.dueDate).getTime() : 0;
        return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
      } else if (sortBy === "priority") {
        const priorityOrder = { LOW: 1, MEDIUM: 2, HIGH: 3 };
        return sortDirection === "asc"
          ? priorityOrder[a.priority] - priorityOrder[b.priority]
          : priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      return 0;
    });

    return sortedTasks;
  },
});
