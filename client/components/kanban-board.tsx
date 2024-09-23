"use client";

import React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, FlagIcon } from "lucide-react";
import { AddTaskComponent } from "./add-task";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { taskState } from "@/recoil/atoms";
import {
  completedTasksState,
  inProgressTasksState,
  toDoTasksState,
} from "@/recoil/selectors";
import { Status, Task } from "@/lib/types";
import axios from "axios";
import { BACKEND_URL } from "@/lib/config";
import { useToast } from "@/hooks/use-toast";

const priorityColors = {
  LOW: "bg-green-100 text-green-800",
  MEDIUM: "bg-yellow-100 text-yellow-800",
  HIGH: "bg-red-100 text-red-800",
};

export function KanbanBoardComponent() {
  const todoTasks = useRecoilValue(toDoTasksState);
  const inProgressTasks = useRecoilValue(inProgressTasksState);
  const completedTasks = useRecoilValue(completedTasksState);
  const { toast } = useToast();
  const setTasks = useSetRecoilState(taskState);


  const onDragEnd = async (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
  
    const sourceTasks = [...getTasksByStatus(source.droppableId)];
    const [removed] = sourceTasks.splice(source.index, 1);
  
    const updatedTask = { ...removed, status: destination.droppableId as Status };
  
    if (source.droppableId !== destination.droppableId) {
      const destTasks = [...getTasksByStatus(destination.droppableId)];
      destTasks.splice(destination.index, 0, updatedTask);
  
      // Update both source and destination lists
      setTasks((prev) => [
        ...prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
      ]);
      try {
        // Update the task status via API
        const response = await axios.put(
          `${BACKEND_URL}/api/tasks/${removed.id}`,
          {
            ...removed,
            status: destination.droppableId as Status,
          },
          {
            withCredentials: true,
          }
        );
    
        const newTask = response.data.updatedTask; 
        toast({
          title: "Task: " + newTask.title,
          description: "Status updated successfully",
        });
      } catch (error) {
        toast({
          description: `Something Went Wrong!: ${error}`,
        });
        //revert the optimistic update if the API call fails
        setTasks((prev) => [
          ...prev.map((task) => (task.id === updatedTask.id ? removed : task)),
        ]);
      }
    }
  };

  const getTasksByStatus = (status: string) => {
    switch (status) {
      case Status.TO_DO:
        return todoTasks;
      case Status.IN_PROGRESS:
        return inProgressTasks;
      case Status.COMPLETED:
        return completedTasks;
      default:
        return [];
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Kanban Board</h1>
      <AddTaskComponent />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-4">
          <Column id={Status.TO_DO} title="Todo" tasks={todoTasks} />
          <Column
            id={Status.IN_PROGRESS}
            title="In Progress"
            tasks={inProgressTasks}
          />
          <Column
            id={Status.COMPLETED}
            title="Completed"
            tasks={completedTasks}
          />
        </div>
      </DragDropContext>
    </div>
  );
}

const Column = ({
  id,
  title,
  tasks,
}: {
  id: Status;
  title: string;
  tasks: Task[];
}) => (
  <div key={id} className="flex-1">
    <h2 className="font-semibold mb-2">{title}</h2>
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={`min-h-[200px] h-full p-2 rounded-lg ${
            snapshot.isDraggingOver ? "bg-gray-100" : "bg-gray-50"
          }`}
        >
          {tasks.map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(provided, snapshot) => (
                <Card
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className={`mb-3 ${snapshot.isDragging ? "shadow-lg" : ""}`}
                >
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">{task.title}</h3>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant="secondary"
                        className={priorityColors[task.priority]}
                      >
                        <FlagIcon className="w-3 h-3 mr-1" />
                        {task.priority}
                      </Badge>
                      {task.dueDate && (
                        <Badge variant="outline">
                          <CalendarIcon className="w-3 h-3 mr-1" />
                          {task.dueDate.toLocaleString()}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </div>
);
