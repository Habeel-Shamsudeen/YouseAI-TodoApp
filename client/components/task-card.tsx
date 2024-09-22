"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Priority, Status, Task } from "@/lib/types";
import { useSetRecoilState } from "recoil";
import { taskState } from "@/recoil/atoms";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

function TaskCard(task: Task) {
  const {toast} = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);
  const setTasks = useSetRecoilState(taskState)

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setIsEditing(false);
    setEditedTask(task);
  };

  const handleSave = async () => {
    try {
      console.log(editedTask);
      const response = await axios.put(`/api/tasks/${editedTask.id}`,{
        editedTask
      },{
        withCredentials:true
      });
      setTasks((prev) =>
        prev.map((task) =>
          task.id === response.data.updatedTask.id ? response.data.updatedTask : task
        )
      );
      toast({
        title: "Task Updated",
      });
      setIsEditing(false);
    } catch (error) {
      toast({
        title: "Error while updating task.",
        description: `Please check try again.${error}`,
      });
      console.error("Failed to update task:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/tasks/${task.id}`);
      setTasks((prev) => prev.filter((stateTask) => stateTask.id !== task.id));
      toast({
        title: "Task deleted",
      });
    } catch (error) {
      toast({
        title: "Error while updating task.",
        description: `Please check try again.${error}`,
      });
      console.error("Failed to delete task:", error);
    }
  };

  const handleChange = (field: keyof Task, value: string | Date) => {
    setEditedTask((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {isEditing ? (
            <Input
              value={editedTask.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="font-bold"
              placeholder="Task Title"
            />
          ) : (
            <span>{task.title}</span>
          )}
          {!isEditing && (
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" onClick={handleEdit}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={handleDelete}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isEditing ? (
          <>
            <Textarea
              value={editedTask.description || ""}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Description"
            />
            <Select
              value={editedTask.status}
              onValueChange={(value) => handleChange("status", value as Status)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="TODO">To Do</SelectItem>
                <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                <SelectItem value="DONE">Done</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={editedTask.priority}
              onValueChange={(value) =>
                handleChange("priority", value as Priority)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="LOW">Low</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="HIGH">High</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="date"
              value={
                editedTask.dueDate
                  ? format(new Date(editedTask.dueDate), "yyyy-MM-dd")
                  : ""
              }
              onChange={(e) =>
                handleChange("dueDate", new Date(e.target.value))
              }
            />
          </>
        ) : (
          <>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Priority: {task.priority}</p>
            {task.dueDate && (
              <p className="flex items-center">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Due: {format(new Date(task.dueDate), "PPP")}
              </p>
            )}
          </>
        )}
      </CardContent>
      {isEditing && (
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </CardFooter>
      )}
    </Card>
  );
}
