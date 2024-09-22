"use client";
import { taskState, userState } from "@/recoil/atoms";
import { useRecoilValue } from "recoil";

export default function TodoHome() {
  const userDetails = useRecoilValue(userState);
  const tasks = useRecoilValue(taskState);
  return <div>{tasks.map((task)=> task.title)}</div>;
}
