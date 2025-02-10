import React from "react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { LazyTaskColumn, LazyTaskCard } from "@config/lazyLoader";
import { TaskBoardProps } from "@interface/socketIo/interface";

const TaskBoard: React.FC<TaskBoardProps> = ({
  columns,
  tasks,
  filterDate,
  activeTaskId,
  isCollaborator,
  handleDragStart,
  handleDragEnd,
  handleOpenModal,
  handleDeleteTask,
}) => {
  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="columns-container">
        {Object.values(columns).map((column) => (
          <LazyTaskColumn
            key={column.id}
            column={column}
            tasks={tasks}
            onEdit={handleOpenModal}
            onDelete={handleDeleteTask}
            filterDate={filterDate}
            isCollaborator={isCollaborator}
          />
        ))}
      </div>
      <DragOverlay>
        {activeTaskId && tasks[activeTaskId] && (
          <LazyTaskCard
            task={tasks[activeTaskId]}
            index={0}
            onEdit={handleOpenModal}
            onDelete={handleDeleteTask}
            columnId=""
            isCollaborator={isCollaborator}
          />
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default TaskBoard;