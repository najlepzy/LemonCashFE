import { DragEndEvent } from "@dnd-kit/core";
import { UseDragAndDropProps } from "@interface/tasks/interfaces";
import { Socket } from "socket.io-client";

interface TaskMovedEventData {
  taskId: string;
  sourceColumnId: string;
  destinationColumnId: string;
  sourceIndex: number;
  destinationIndex: number;
  newStatus: string;
  senderId: number;
}

interface UseDragAndDropExtendedProps extends UseDragAndDropProps {
  socket?: Socket;
  senderId: number;
}

const useDragAndDrop = ({
  updateTaskStatus,
  reorderWithinColumn,
  moveTaskBetweenColumns,
  socket,
  senderId,
}: UseDragAndDropExtendedProps) => {
  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    const source = active.data.current as
      | { droppableId: string; index: number }
      | undefined;
    const destination = over?.data.current as
      | { droppableId: string; index: number }
      | undefined;

    if (
      !over ||
      !source ||
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }

    const taskId = active.id as string;
    const sourceColumnId = source.droppableId;
    const destinationColumnId = destination.droppableId;

    const columnMapping: Record<string, { backend: string; display: string }> =
      {
        "column-1": { backend: "TODO", display: "To Do" },
        "column-2": { backend: "IN_PROGRESS", display: "In Progress" },
        "column-3": { backend: "DONE", display: "Done" },
      };

    const newStatus = columnMapping[destinationColumnId].backend;

    updateTaskStatus(taskId, newStatus);

    if (sourceColumnId === destinationColumnId) {
      reorderWithinColumn(
        sourceColumnId,
        source.index,
        destination.index,
        taskId
      );
    } else {
      moveTaskBetweenColumns(
        sourceColumnId,
        destinationColumnId,
        source.index,
        destination.index,
        taskId
      );
    }

    if (socket) {
      socket.emit("task-moved", {
        taskId,
        sourceColumnId,
        destinationColumnId,
        sourceIndex: source.index,
        destinationIndex: destination.index,
        newStatus,
        senderId,
      } as TaskMovedEventData);
    }

    setTimeout(() => {
      const element = document.getElementById(taskId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  };

  return { onDragEnd };
};

export default useDragAndDrop;