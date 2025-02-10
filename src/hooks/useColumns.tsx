import { useState } from "react";
import { initialColumns } from "@config/initialData";
import { Column, UseColumnsReturn } from "@interface/tasks/interfaces";

const useColumns = (initial = initialColumns): UseColumnsReturn => {
  const [columns, setColumns] = useState<Record<string, Column>>(initial);

  const reorderWithinColumn = (
    columnId: string,
    sourceIndex: number,
    destinationIndex: number,
    draggableId: string
  ) => {
    const column = columns[columnId];
    if (!column) return;
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(sourceIndex, 1);
    newTaskIds.splice(destinationIndex, 0, draggableId);
    setColumns((prev) => ({
      ...prev,
      [columnId]: { ...column, taskIds: newTaskIds },
    }));
  };

  const moveTaskBetweenColumns = (
    sourceColumnId: string,
    destinationColumnId: string,
    _sourceIndex: number,
    destinationIndex: number,
    draggableId: string
  ) => {
    const sourceColumn = columns[sourceColumnId];
    const destinationColumn = columns[destinationColumnId];
    if (!sourceColumn || !destinationColumn) return;

    const newSourceTaskIds = sourceColumn.taskIds.filter(
      (id) => id !== draggableId
    );
    const newDestinationTaskIds = destinationColumn.taskIds.filter(
      (id) => id !== draggableId
    );

    newDestinationTaskIds.splice(destinationIndex, 0, draggableId);

    setColumns((prev) => ({
      ...prev,
      [sourceColumnId]: { ...sourceColumn, taskIds: newSourceTaskIds },
      [destinationColumnId]: {
        ...destinationColumn,
        taskIds: newDestinationTaskIds,
      },
    }));
  };

  const addTaskToColumn = (columnId: string, taskId: string) => {
    const column = columns[columnId];
    if (!column) return;
    setColumns((prev) => ({
      ...prev,
      [columnId]: { ...column, taskIds: [...column.taskIds, taskId] },
    }));
  };

  const removeTaskFromColumn = (columnId: string, taskId: string) => {
    if (!columns[columnId]) {
      console.warn(
        `La columna con id "${columnId}" no existe. No se puede eliminar la tarea ${taskId}.`
      );
      return;
    }
    setColumns((prev) => {
      const column = prev[columnId];
      if (!column) return prev;
      return {
        ...prev,
        [columnId]: {
          ...column,
          taskIds: column.taskIds.filter((id) => id !== taskId),
        },
      };
    });
  };

  return {
    columns,
    reorderWithinColumn,
    moveTaskBetweenColumns,
    addTaskToColumn,
    removeTaskFromColumn,
    setColumns,
  };
};

export default useColumns;