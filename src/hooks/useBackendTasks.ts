import { useEffect } from "react";
import { fetchTasks } from "@services/task.service";
import { Task, BackendTask, Column } from "@interface/tasks/interfaces";
import { UseBackendTasksParams } from "@interface/socketIo/interface";

const useBackendTasks = ({
  isCollaborator,
  collaborationOwnerId,
  userId,
  setTasks,
  setColumns,
}: UseBackendTasksParams) => {
  useEffect(() => {
    const getTasksFromBackend = async () => {
      try {
        const ownerIdParam = isCollaborator
          ? collaborationOwnerId ?? undefined
          : userId;
        const response = await fetchTasks(ownerIdParam);
        if (response.data && Array.isArray(response.data)) {
          const backendTasks: BackendTask[] = response.data;
          const tasksFromBackend = backendTasks.reduce(
            (
              acc: Record<string, Task>,
              task: BackendTask
            ): Record<string, Task> => {
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
      } catch (error) {
        console.error("Error fetching tasks from backend:", error);
      }
    };
    getTasksFromBackend();
  }, [isCollaborator, collaborationOwnerId, userId, setTasks, setColumns]);
};

export default useBackendTasks;
