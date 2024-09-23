import { Task, User } from '@/lib/types';
import { atom } from 'recoil';

export const userState = atom<User | null>({
  key: 'userState', // unique ID
  default: null, // default value
});

export const taskState = atom<Task[]>({
  key: "taskState",
  default: []
})

// Atom to store the search term
export const searchTermState = atom({
  key: "searchTermState",
  default: "",
});

// Atom to store the filter status
export const filterStatusState = atom({
  key: "filterStatusState",
  default: "all",  // Default to "all"
});

// Atom to store the filter priority
export const filterPriorityState = atom({
  key: "filterPriorityState",
  default: "all",  // Default to "all"
});

// Atom to store the sort by option
export const sortByState = atom({
  key: "sortByState",
  default: "dueDate",  // Default to sorting by due date
});

// Atom to store the sort direction
export const sortDirectionState = atom({
  key: "sortDirectionState",
  default: "asc",  // Default to ascending order
});
