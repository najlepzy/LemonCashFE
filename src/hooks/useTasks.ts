import { useState } from "react";
import {
  createTask as createTaskAPI,
  updateTask as updateTaskAPI,
  updateTaskStatus as updateTaskStatusAPI,
  deleteTask as deleteTaskAPI,
  toggleTaskCompletion as toggleTaskCompletionAPI,
} from "@services/task.service";
import { Task } from "@interface/tasks/interfaces";
import { taskToast } from "@config/taskToast";

const useTasks = () => {
  const [tasks, setTasks] = useState<Record<string, Task>>({});

  const createTask = async (
    title: string,
    description: string
  ): Promise<Task> => {
    const response = await createTaskAPI({ title, description });
    const backendTask = response.data;
    const newTask: Task = {
      id: backendTask.id.toString(),
      title: backendTask.title,
      description: backendTask.description,
      completed: backendTask.status === "DONE",
      createdAt: backendTask.createdAt,
      status: backendTask.status,
    };
    setTasks((prev) => ({ ...prev, [newTask.id]: newTask }));
    return newTask;
  };

  const updateTask = async (
    taskId: string,
    title: string,
    description: string
  ) => {
    await updateTaskAPI(taskId, { title, description });
    setTasks((prev) => ({
      ...prev,
      [taskId]: { ...prev[taskId], title, description },
    }));
    taskToast({
      type: "success",
      message: "Task updated successfully.",
    });
  };

  const deleteTask = async (taskId: string) => {
    await deleteTaskAPI(taskId);
    setTasks((prev) => {
      const newTasks = { ...prev };
      delete newTasks[taskId];
      return newTasks;
    });
    taskToast({
      type: "success",
      message: "Task deleted successfully.",
    });
  };

  const toggleTaskCompletion = async (taskId: string, completed: boolean) => {
    await toggleTaskCompletionAPI(taskId, completed);
    setTasks((prev) => ({
      ...prev,
      [taskId]: { ...prev[taskId], completed },
    }));
    taskToast({
      type: "success",
      message: "Task completion toggled successfully.",
    });
  };

  const updateTaskStatus = async (taskId: string, status: string) => {
    if (tasks[taskId]?.status === status) {
      return; 
    }
    await updateTaskStatusAPI(taskId, status);
    setTasks((prev) => ({
      ...prev,
      [taskId]: { ...prev[taskId], status, completed: status === "DONE" },
    }));
    taskToast({
      type: "success",
      message: "Task status updated successfully.",
    });
  };
  
  return {
    tasks,
    setTasks,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskCompletion,
    updateTaskStatus,
  };
};

export default useTasks;