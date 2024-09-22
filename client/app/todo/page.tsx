"use client";
import useSession from "@/hooks/useSession";
import { taskState, userState } from "@/recoil/atoms";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";

export default function TodoHome() {
  const userDetails = useRecoilValue(userState);
  const tasks = useRecoilValue(taskState);
  return <div>{userDetails?.name}</div>;
}
