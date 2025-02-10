import React, { useEffect, useRef } from "react";
import { TaskModalProps } from "@interface/tasks/interfaces";
import { TASK_MODAL_TEXT } from "@utils/constants";

const TaskModal: React.FC<TaskModalProps> = ({
  isEditing,
  title,
  description,
  onClose,
  onSave,
  setTitle,
  setDescription,
}) => {
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    titleInputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") onClose();
    else if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSave();
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal" onKeyDown={handleKeyDown}>
        <h2 id="modal-title">
          {isEditing ? TASK_MODAL_TEXT.EDIT_TITLE : TASK_MODAL_TEXT.NEW_TITLE}
        </h2>
        <label htmlFor="task-title">{TASK_MODAL_TEXT.TITLE_LABEL}</label>
        <input
          id="task-title"
          ref={titleInputRef}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="task-desc">{TASK_MODAL_TEXT.DESCRIPTION_LABEL}</label>
        <textarea
          id="task-desc"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="modal-buttons">
          <button
            className="btn-cancel"
            onClick={onClose}
            aria-label="Close modal"
          >
            {TASK_MODAL_TEXT.CANCEL}
          </button>
          <button
            className="btn-save"
            onClick={onSave}
            aria-label={isEditing ? "Save changes" : "Create new task"}
          >
            {TASK_MODAL_TEXT.SAVE}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;