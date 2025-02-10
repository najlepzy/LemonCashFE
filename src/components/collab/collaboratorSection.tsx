import React from "react";
import {
  LazyCollaboratorList,
  LazyCollaboratorModal,
} from "@config/lazyLoader";
import { CollaboratorsSectionProps } from "@interface/collabs/interfaces";
import CollaboratorInviteModal from "./collaboratorInviteModal";
import { COLLAB_SECTION_TEXT } from "@utils/collabConstants";

const CollaboratorsSection: React.FC<CollaboratorsSectionProps> = ({
  collabInvite,
  handleAcceptInvite,
  handleRejectInvite,
  isCollaborator,
  collabOwnerName,
  handleExitCollaboration,
  collaborators,
  openCollaboratorModal,
  removeCollaborator,
  isCollaboratorModalOpen,
  collaboratorInput,
  setCollaboratorInput,
  saveCollaborator,
  closeCollaboratorModal,
  collaboratorInputRef,
}) => {
  return (
    <>
      {collabInvite && (
        <CollaboratorInviteModal
          ownerName={collabInvite.ownerName}
          onAccept={handleAcceptInvite}
          onReject={handleRejectInvite}
        />
      )}

      {isCollaborator && collabOwnerName && (
        <div className="collaborator-fixed-container">
          <div className="collaborators-group">
            <p>{COLLAB_SECTION_TEXT.COLLABORATING_MESSAGE(collabOwnerName)}</p>
            <button
              className="exit-collab-button"
              onClick={handleExitCollaboration}
            >
              {COLLAB_SECTION_TEXT.LEAVE_COLLABORATION}
            </button>
          </div>
        </div>
      )}

      {!isCollaborator && (
        <LazyCollaboratorList
          collaborators={collaborators}
          onOpenModal={openCollaboratorModal}
          onDelete={removeCollaborator}
        />
      )}

      {isCollaboratorModalOpen && (
        <LazyCollaboratorModal
          collaboratorInput={collaboratorInput}
          setCollaboratorInput={setCollaboratorInput}
          onSave={saveCollaborator}
          onClose={closeCollaboratorModal}
          inputRef={collaboratorInputRef}
        />
      )}
    </>
  );
};

export default CollaboratorsSection;