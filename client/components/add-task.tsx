'use client'

import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSetRecoilState } from "recoil";
import { taskState } from "@/recoil/atoms";
import { Priority, Status, Task } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";

export function AddTaskComponent() {
  // State for Task attributes
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<Status>("TO_DO" as Status); // Enforced type
  const [priority, setPriority] = useState<Priority>("LOW" as Priority); // Enforced type
  const [dueDate, setDueDate] = useState<string>(""); // String for input value, will be converted to Date later
  
  const { toast } = useToast();
  const setTodos = useSetRecoilState(taskState);

  // Function to handle task creation
  const onSubmitHandler =async () => {
    if (title.length === 0) {
      toast({
        title: "Warning: Empty Title",
        description: "Title should not be empty",
      });
      return;
    }
    try {
      const taskData: Omit<Task, 'id'> = {
        title,
        description,
        status,
        priority,
        dueDate: dueDate ? new Date(dueDate) : undefined, // Convert string to Date
      };
      const response = await axios.post(`${BACKEND_URL}/api/tasks`,{
        taskData
      },{
        withCredentials:true
      })
      const newTask = response.data.newTask;
      setTodos((prevTodos) => [...prevTodos, newTask]);
      toast({
        title: "Task: " + newTask.title,
        description: "Added successfully",
      });
      setTitle("");
      setDescription("");
      setStatus("TO_DO" as Status); // Reset to default
      setPriority("LOW" as Priority);  // Reset to default
      setDueDate("");      // Reset date field
    } catch (error) {
      toast({
        description: "Something Went Wrong!",
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="bg-black text-white">
          <PlusIcon className="w-4 h-4 mr-2" />
          Add a Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a Task</DialogTitle>
          <DialogDescription>
            Enter the details to add a new task. Click add when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select
              onValueChange={(value: Status) => setStatus(value as Status)} // Ensure Status type
              defaultValue={status}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="TO_DO">To Do</SelectItem>
                <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="priority" className="text-right">
              Priority
            </Label>
            <Select
              onValueChange={(value: Priority) => setPriority(value as Priority)} // Ensure Priority type
              defaultValue={priority}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LOW">Low</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="HIGH">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dueDate" className="text-right">
              Due Date
            </Label>
            <Input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)} // Date as string, convert when submitting
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={onSubmitHandler}>
            Add Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
