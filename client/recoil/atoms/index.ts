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
