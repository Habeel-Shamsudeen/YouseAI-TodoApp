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
import {
  userState,
  taskState,
  searchTermState,
  filterStatusState,
  filterPriorityState,
  sortByState,
  sortDirectionState,
} from "@/recoil/atoms";
import { User } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { BACKEND_URL } from "@/lib/config";
import axios from "axios";
import { getTokenFromCookies } from "@/hooks/useSession";
import Cookies from "js-cookie";

export default function Appbar({ user }: { user: User }) {
  // Reset Recoil states
  const resetUser = useResetRecoilState(userState);
  const resetTask = useResetRecoilState(taskState);
  const resetSearchTerm = useResetRecoilState(searchTermState);
  const resetFilterStatus = useResetRecoilState(filterStatusState);
  const resetFilterPriority = useResetRecoilState(filterPriorityState);
  const resetSortBy = useResetRecoilState(sortByState);
  const resetSortDirection = useResetRecoilState(sortDirectionState);

  // hook to show toast notification
  const { toast } = useToast();
  const userName = user.name;
  const handleSignOut = async () => {
    try {
      // Call the API to log out-> basically removes the cookie (token)
      const token = decodeURIComponent(getTokenFromCookies());
      await axios.post(
        `${BACKEND_URL}/api/auth/logout`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `${token}`,
          },
        } // send cookies with request
      );
      Cookies.remove('token')
      // Reset states in Recoil
      resetUser();
      resetTask();
      resetSearchTerm();
      resetFilterStatus();
      resetFilterPriority();
      resetSortBy();
      resetSortDirection();

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
    <header className="bg-background border-b px-4 py-4 flex items-center justify-between shrink-0 md:px-6 md:py-4 shadow-sm bg-black text-slate-50">
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
      <div className=" gap-5 hidden md:flex ml-22">
        <Link href={"/todo"}>
          <span className="text-md font-normal hover:text-slate-500">
            TodoList
          </span>
        </Link>
        <Link href={"/kanban"}>
          <span className="text-md font-normal hover:text-slate-500">
            KanbanBoard
          </span>
        </Link>
      </div>

      <div className="flex gap-1">
        {/* <div className="flex  flex-col justify-center align-middle items-center">
      <AddTaskComponent/>
      </div> */}
        <span className="flex items-center mx-3 text-md font-medium">
          {userName.toUpperCase()}
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
