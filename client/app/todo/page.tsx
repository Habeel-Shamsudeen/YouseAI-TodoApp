"use client";
// seperate the page into components
import { useRecoilState, useRecoilValue } from "recoil";
import {
  filterPriorityState,
  filterStatusState,
  searchTermState,
  sortByState,
  sortDirectionState
} from "@/recoil/atoms";
import { filteredAndSortedTasksState } from "@/recoil/selectors";
import TaskCard from "@/components/task-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SortAsc, SortDesc } from "lucide-react";
import { AddTaskComponent } from "@/components/add-task";

type SortOption = "title" | "dueDate" | "priority";

export default function TodoHome() {
  const [searchTerm, setSearchTerm] = useRecoilState(searchTermState);
  const [filterStatus, setFilterStatus] = useRecoilState(filterStatusState);
  const [filterPriority, setFilterPriority] =
    useRecoilState(filterPriorityState);
  const [sortBy, setSortBy] = useRecoilState(sortByState);
  const [sortDirection, setSortDirection] = useRecoilState(sortDirectionState);

  const tasks = useRecoilValue(filteredAndSortedTasksState);

  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Task List</h1>
      </header>

      <div className="flex flex-wrap gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="TO_DO">To Do</SelectItem>
            <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterPriority} onValueChange={setFilterPriority}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="LOW">Low</SelectItem>
            <SelectItem value="MEDIUM">Medium</SelectItem>
            <SelectItem value="HIGH">High</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={sortBy}
          onValueChange={(value: SortOption) => setSortBy(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="title">Title</SelectItem>
            <SelectItem value="dueDate">Due Date</SelectItem>
            <SelectItem value="priority">Priority</SelectItem>
          </SelectContent>
        </Select>
        <Button
          onClick={toggleSortDirection}
          variant="outline"
          className="w-[50px]"
        >
          {sortDirection === "asc" ? <SortAsc /> : <SortDesc />}
        </Button>
        <AddTaskComponent />
      </div>
      <div className="flex flex-col md:grid md:grid-cols-2 gap-4 justify-center">
        {tasks.length === 0 ? (
          <p className="text-center text-muted-foreground col-span-2">
            No tasks found.
          </p>
        ) : (
          tasks.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
}
