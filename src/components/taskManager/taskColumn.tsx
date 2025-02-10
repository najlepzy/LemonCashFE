import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { ExtendedTaskColumnProps } from "@interface/tasks/interfaces";
import TaskCard from "./taskCard";

const TaskColumn: React.FC<ExtendedTaskColumnProps> = ({
  column,
  tasks,
  onEdit,
  onDelete,
  filterDate,
  isCollaborator,
}) => {
  const filteredTaskIds = column.taskIds.filter((taskId) => {
    const task = tasks[taskId];
    return task
      ? !filterDate ||
          new Date(task.createdAt).toISOString().substring(0, 10) === filterDate
      : false;
  });

  const { setNodeRef } = useDroppable({
    id: column.id,
    data: { droppableId: column.id },
  });

  return (
    <div
      className="column"
      role="region"
      aria-labelledby={`column-title-${column.id}`}
    >
      <h2 id={`column-title-${column.id}`} className="column-title">
        {column.title}
      </h2>
      <div className="task-list" ref={setNodeRef} aria-live="polite">
        {filteredTaskIds.map((taskId, index) => (
          <TaskCard
            key={tasks[taskId].id}
            task={tasks[taskId]}
            index={index}
            onEdit={onEdit}
            onDelete={onDelete}
            columnId={column.id}
            isCollaborator={isCollaborator}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;