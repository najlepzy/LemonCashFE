import React from "react";
import { FiPlus } from "react-icons/fi";
import { TASK_MANAGER_TEXT } from "@utils/constants";
import { LazyDateFilter } from "@config/lazyLoader";
import { TaskManagerHeaderProps } from "@interface/tasks/interfaces";

const TaskManagerHeader: React.FC<TaskManagerHeaderProps> = ({
  filterDate,
  setFilterDate,
  isCollaborator,
  handleOpenModal,
}) => {
  return (
    <>
      <h1 className="task-manager-title">{TASK_MANAGER_TEXT.TITLE}</h1>
      <p className="task-manager-subtitle">{TASK_MANAGER_TEXT.SUBTITLE}</p>
      <LazyDateFilter filterDate={filterDate} setFilterDate={setFilterDate} />
      <div className="sticky-header">
        {!isCollaborator && (
          <button className="add-task-button" onClick={handleOpenModal}>
            <FiPlus size={20} />
            {TASK_MANAGER_TEXT.CREATE_TASK}
          </button>
        )}
      </div>
    </>
  );
};

export default TaskManagerHeader;