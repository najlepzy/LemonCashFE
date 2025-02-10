import React from "react";
import { FiX } from "react-icons/fi";
import { CollaboratorListProps } from "@interface/collabs/interfaces";
import { COLLAB_LIST_TEXT } from "@utils/collabConstants";

const CollaboratorList: React.FC<CollaboratorListProps> = ({
  collaborators,
  onOpenModal,
  onDelete,
}) => {
  const getInitialLetter = (email: string = "") =>
    email.charAt(0).toUpperCase();

  const getCollaboratorEmail = (collaborator: { email?: string; name: string }) =>
    collaborator.email || collaborator.name;

  const visibleCollaborators = collaborators.slice(0, 3);
  const additionalCount = collaborators.length > 3 ? collaborators.length - 3 : 0;

  return (
    <div className="collaborator-fixed-container">
      <div role="list" aria-label="List of collaborators">
        {visibleCollaborators.map((collaborator) => {
          const email = getCollaboratorEmail(collaborator);
          return (
            <div
              className="collaborator-item"
              key={collaborator.id}
              role="listitem"
              style={{ position: "relative" }}
            >
              <div className="collaborator-circle" title={email}>
                {getInitialLetter(email)}
              </div>
              <button
                className="collaborator-delete-button"
                onClick={() => onDelete(collaborator.id)}
                title={COLLAB_LIST_TEXT.REMOVE_COLLABORATOR}
              >
                <FiX size={10} />
              </button>
              <div className="collaborator-tooltip">{email}</div>
            </div>
          );
        })}
      </div>
      {additionalCount > 0 && (
        <div className="plus-container" role="listitem">
          <div
            className="collaborator-circle plus-circle"
            title={`+${additionalCount} more`}
          >
            +{additionalCount}
          </div>
          <div className="plus-tooltip">
            {collaborators.slice(3).map((collaborator) => (
              <div key={collaborator.id} className="tooltip-item">
                {getCollaboratorEmail(collaborator)}
              </div>
            ))}
          </div>
        </div>
      )}
      <button
        className="add-collaborator-button"
        onClick={onOpenModal}
        aria-label="Add new collaborator"
      >
        {COLLAB_LIST_TEXT.ADD_COLLABORATOR}
      </button>
    </div>
  );
};

export default CollaboratorList;