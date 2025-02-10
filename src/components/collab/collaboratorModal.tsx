import React, { useEffect, useRef } from "react";
import { CollaboratorModalProps } from "@interface/collabs/interfaces";
import { COLLAB_MODAL_TEXT } from "@utils/collabConstants";

const CollaboratorModal: React.FC<CollaboratorModalProps> = ({
  collaboratorInput,
  setCollaboratorInput,
  onSave,
  onClose,
  inputRef,
}) => {
  const localInputRef = useRef<HTMLInputElement>(null);
  const combinedRef = inputRef || localInputRef;

  useEffect(() => {
    combinedRef.current?.focus();
  }, [combinedRef]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSave();
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="collaborator-modal-title"
      aria-describedby="collaborator-input"
    >
      <div className="modal" onKeyDown={handleKeyDown}>
        <h2 id="collaborator-modal-title">{COLLAB_MODAL_TEXT.TITLE}</h2>
        <label htmlFor="collaborator-input">{COLLAB_MODAL_TEXT.LABEL}</label>
        <input
          id="collaborator-input"
          ref={combinedRef}
          type="text"
          value={collaboratorInput}
          onChange={(e) => setCollaboratorInput(e.target.value)}
        />
        <div className="modal-buttons">
          <button
            className="btn-cancel"
            onClick={onClose}
            aria-label="Close collaborator modal"
          >
            {COLLAB_MODAL_TEXT.CANCEL}
          </button>
          <button
            className="btn-save"
            onClick={onSave}
            aria-label="Save collaborator"
          >
            {COLLAB_MODAL_TEXT.SAVE}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollaboratorModal;