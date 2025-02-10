import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { showToast } from "@config/collabToast";
import { UseSocketParams } from "@interface/socketIo/interface";

const SOCKET_SERVER_URL = `${import.meta.env.VITE_BASE_URL}${
  import.meta.env.VITE_PORT
}`;

const useSocket = ({
  userId,
  setCollabInvite,
  setCollaborators,
  setTasks,
  setColumns,
  handleExitCollaboration,
  applyTaskMove,
}: UseSocketParams): Socket | undefined => {
  const socketRef = useRef<Socket>();

  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL, { query: { userId } });

    socketRef.current.on("collaborator-invite", (data) => {
      setCollabInvite(data);
    });

    socketRef.current.on("collaborator-accepted", (data) => {
      if (data.ownerId === userId) {
        setCollaborators((prev) => [
          ...prev,
          {
            id: data.collaborator.id.toString(),
            name:
              data.collaborator.email ||
              data.collaborator.username ||
              "No name",
          },
        ]);
      }
    });

    socketRef.current.on("task-created", (createdTask) => {
      const normalizedTask = {
        ...createdTask,
        id: createdTask.id.toString(),
        completed: createdTask.completed || false,
      };

      setTasks((prev: Record<string, any>) => ({
        ...prev,
        [normalizedTask.id]: normalizedTask,
      }));

      const statusMapping: Record<string, string> = {
        TODO: "column-1",
        IN_PROGRESS: "column-2",
        DONE: "column-3",
      };
      const newColumnId = statusMapping[normalizedTask.status] || "column-1";

      setColumns((prevCols: Record<string, any>) => ({
        ...prevCols,
        [newColumnId]: {
          ...prevCols[newColumnId],
          taskIds: [...prevCols[newColumnId].taskIds, normalizedTask.id],
        },
      }));

      showToast("success", `New task created: ${normalizedTask.title}`);
    });

    socketRef.current.on("task-updated", (updatedTask) => {
      const normalizedTask = {
        ...updatedTask,
        id: updatedTask.id.toString(),
        completed: updatedTask.status === "DONE",
      };
      setTasks((prev) => ({ ...prev, [normalizedTask.id]: normalizedTask }));

      const statusMapping: Record<string, string> = {
        TODO: "column-1",
        IN_PROGRESS: "column-2",
        DONE: "column-3",
      };
      const newColumnId = statusMapping[normalizedTask.status];

      setColumns((prevColumns) => {
        const alreadyExists = Object.values(prevColumns).some(
          (col: any) =>
            col.id === newColumnId && col.taskIds.includes(normalizedTask.id)
        );
        if (alreadyExists) return prevColumns;

        const updatedColumns = { ...prevColumns };
        Object.keys(updatedColumns).forEach((colId) => {
          updatedColumns[colId] = {
            ...updatedColumns[colId],
            taskIds: updatedColumns[colId].taskIds.filter(
              (id: string) => id !== normalizedTask.id
            ),
          };
        });
        updatedColumns[newColumnId] = {
          ...updatedColumns[newColumnId],
          taskIds: [...updatedColumns[newColumnId].taskIds, normalizedTask.id],
        };
        return updatedColumns;
      });
    });

    socketRef.current.on("task-deleted", (data) => {
      const deletedId = data.id.toString();
      setTasks((prev) => {
        const newTasks = { ...prev };
        delete newTasks[deletedId];
        return newTasks;
      });
      setColumns((prevCols) => {
        const newCols = { ...prevCols };
        for (const colId in newCols) {
          newCols[colId] = {
            ...newCols[colId],
            taskIds: newCols[colId].taskIds.filter(
              (tid: string) => tid !== deletedId
            ),
          };
        }
        return newCols;
      });
    });

    socketRef.current.on("collaboration-revoked", () => {
      handleExitCollaboration();
    });

    socketRef.current.on("collaborator-removed", (data) => {
      setCollaborators((prev) =>
        prev.filter(
          (colab: any) => String(colab.id) !== String(data.collaboratorId)
        )
      );
    });

    socketRef.current.on("task-moved", (data) => {
      if (data.senderId === userId) return;
      const {
        taskId,
        sourceColumnId,
        destinationColumnId,
        sourceIndex,
        destinationIndex,
        newStatus,
      } = data;
      applyTaskMove(
        taskId,
        sourceColumnId,
        destinationColumnId,
        sourceIndex,
        destinationIndex,
        newStatus
      );
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [
    userId,
    setCollabInvite,
    setCollaborators,
    setTasks,
    setColumns,
    handleExitCollaboration,
    applyTaskMove,
  ]);

  return socketRef.current;
};

export default useSocket;
