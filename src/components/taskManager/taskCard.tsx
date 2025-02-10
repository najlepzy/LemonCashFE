import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { FiTrash2, FiEdit } from "react-icons/fi";
import { ExtendedTaskCardProps } from "@interface/tasks/interfaces";

const TaskCard: React.FC<ExtendedTaskCardProps> = ({
  task,
  index,
  onEdit,
  onDelete,
  columnId,
  isCollaborator = false,
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
      data: { droppableId: columnId, index },
    });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0 : 1,
    touchAction: "none",
  };

  return (
    <div
      id={task.id}
      className={`task-card ${task.completed ? "task-completed" : ""}`}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      role="article"
      tabIndex={0}
      aria-labelledby={`task-title-${task.id}`}
      aria-describedby={`task-desc-${task.id}`}
    >
      <div className="task-card-header">
        <div>
          <span className="task-date" style={{ textDecoration: "none" }}>
            {new Date(task.createdAt).toLocaleDateString()}
          </span>
          <h3 id={`task-title-${task.id}`}>{task.title}</h3>
        </div>
        {!isCollaborator && (
          <div className="task-card-buttons">
            <button
              className="task-icon-button edit"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                onEdit(task.id);
              }}
              title="Edit"
              aria-label={`Edit task: ${task.title}`}
            >
              <FiEdit />
            </button>
            <button
              className="task-icon-button delete"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                onDelete(task.id, columnId);
              }}
              title="Delete"
              aria-label={`Delete task: ${task.title}`}
            >
              <FiTrash2 />
            </button>
          </div>
        )}
      </div>
      <p id={`task-desc-${task.id}`}>{task.description}</p>
    </div>
  );
};

export default TaskCard;