"use client";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import SidebarButton from "./sidebarbutton";
import { ClipboardListIcon, LogOutIcon } from "./ui/Icons";
import { useResetRecoilState } from "recoil";
import { taskState, userState } from "@/recoil/atoms";
import { User } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { BACKEND_URL } from "@/lib";
import axios from "axios";

export default function Appbar({ user }: { user: User }) {
  const resetUser = useResetRecoilState(userState);
  const resetTask = useResetRecoilState(taskState);
  const { toast } = useToast();
  let userName = user.name;
  const handleSignOut = async () => {
    try {
      // Call the API to log out basically removes the cookie (token)
      await axios.post(
        `${BACKEND_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );

      // Reset states in Recoil
      resetUser();
      resetTask();

      // Show toast message
      toast({
        title: "Signed Out successfully",
      });
    } catch (error) {
      toast({
        title: "Error while logging out",
      });
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className="bg-background border-b px-4 py-4 flex items-center justify-between shrink-0 md:px-6 md:py-4">
      <div className="flex items-center gap-4">
        <Link
          href={`/todo`}
          className="flex items-center gap-2 md:hidden"
          prefetch={false}
        >
          <span className="text-xl font-semibold">YouseAI</span>
        </Link>
        <div className="items-center gap-2 hidden md:block">
          <Link
            href={`/todo`}
            className="flex items-center gap-2 "
            prefetch={false}
          >
            <ClipboardListIcon className="h-7 w-7" />
            <span className="text-xl font-bold hidden sm:block">YouseAI</span>
          </Link>
        </div>
      </div>
      <div className=" gap-5 hidden md:flex">
        <Link href={'/todo'}>
        <span className="text-md font-normal hover:text-slate-500">TodoList</span>
        </Link>
        <Link href={'/kanban'}>
        <span className="text-md font-normal hover:text-slate-500">KanbanBoard</span>
        </Link>
      </div>
      <div className="flex gap-1">
        <span className="flex items-center mx-3 text-md font-medium">
          Welcome {userName.toUpperCase()}
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full border-2"
            >
              <Avatar className="h-10 w-10 bg-[#333] border-2 hover:border-primary rounded-full">
                <AvatarImage src="/avatar.jpg" />
                <AvatarFallback>
                  {userName[0].toLocaleUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link
                href="#"
                className="flex items-center gap-2"
                prefetch={false}
              >
                <LogOutIcon className="h-4 w-4" />
                <span onClick={handleSignOut}>Logout</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <SidebarButton />
      </div>
    </header>
  );
}
