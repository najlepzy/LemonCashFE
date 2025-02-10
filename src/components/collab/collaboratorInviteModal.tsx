import React, { useEffect } from "react";
import { FiCheck, FiX } from "react-icons/fi";
import "@styles/collaborators.css";
import { CollaboratorInviteModalProps } from "@interface/collabs/interfaces";
import { COLLAB_INVITE_TEXT } from "@utils/collabConstants";

const CollaboratorInviteModal: React.FC<CollaboratorInviteModalProps> = ({
  ownerName,
  onAccept,
  onReject,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onReject();
    }, 10000);

    return () => clearTimeout(timer);
  }, [onReject]);

  return (
    <div className="invite-modal-overlay" onClick={onReject}>
      <div className="invite-modal" onClick={(e) => e.stopPropagation()}>
        <h2>{COLLAB_INVITE_TEXT.TITLE}</h2>
        <p>{COLLAB_INVITE_TEXT.MESSAGE(ownerName)}</p>
        <div className="invite-buttons">
          <button
            className="circle-button accept"
            onClick={onAccept}
            aria-label="Accept invitation"
          >
            <FiCheck size={24} />
          </button>
          <button
            className="circle-button reject"
            onClick={onReject}
            aria-label="Reject invitation"
          >
            <FiX size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollaboratorInviteModal;
