import { useRef, useCallback } from "react";
import { fetchTasks, leaveCollaboration } from "@services/task.service";
import { showToast } from "@config/collabToast";
import {
  BackendTask,
  Column,
  Task,
  UseExitCollaborationParams,
} from "@interface/tasks/interfaces";

const useExitCollaboration = ({
  isCollaborator,
  collaborationOwnerId,
  currentUserId,
  setTasks,
  setColumns,
  setIsCollaborator,
  setCollaborationOwnerId,
  setCollabOwnerName,
}: UseExitCollaborationParams) => {
  const isExiting = useRef(false);

  const handleExitCollaboration = useCallback(async () => {
    if (isExiting.current) return;
    isExiting.current = true;

    if (isCollaborator && collaborationOwnerId) {
      try {
        await leaveCollaboration(collaborationOwnerId);
      } catch (error) {
        console.error("Error leaving collaboration:", error);
      }
    }

    setIsCollaborator(false);
    setCollaborationOwnerId(null);
    setCollabOwnerName(null);

    try {
      const response = await fetchTasks(currentUserId);
      if (response.data && Array.isArray(response.data)) {
        const backendTasks: BackendTask[] = response.data;
        const tasksFromBackend = backendTasks.reduce(
          (acc: Record<string, Task>, task: BackendTask): Record<string, Task> => {
            const transformedTask: Task = {
              id: task.id.toString(),
              title: task.title,
              description: task.description,
              completed: task.status === "DONE",
              createdAt: task.createdAt,
              status: task.status,
            };
            acc[transformedTask.id] = transformedTask;
            return acc;
          },
          {} as Record<string, Task>
        );
        setTasks(tasksFromBackend);

        const newColumns: Record<string, Column> = {
          "column-1": { id: "column-1", title: "To Do", taskIds: [] },
          "column-2": { id: "column-2", title: "In Progress", taskIds: [] },
          "column-3": { id: "column-3", title: "Done", taskIds: [] },
        };

        backendTasks.forEach((task: BackendTask) => {
          const taskId = task.id.toString();
          if (task.status === "TODO") {
            newColumns["column-1"].taskIds.push(taskId);
          } else if (task.status === "IN_PROGRESS") {
            newColumns["column-2"].taskIds.push(taskId);
          } else if (task.status === "DONE") {
            newColumns["column-3"].taskIds.push(taskId);
          }
        });
        setColumns(newColumns);
      }
      showToast("success", "You have left the collaboration");
    } catch (error) {
      console.error("Error reloading tasks after leaving collaboration:", error);
    } finally {
      isExiting.current = false;
    }
  }, [
    isCollaborator,
    collaborationOwnerId,
    currentUserId,
    setTasks,
    setColumns,
    setIsCollaborator,
    setCollabOwnerName,
    setCollaborationOwnerId,
  ]);

  return handleExitCollaboration;
};

export default useExitCollaboration;
