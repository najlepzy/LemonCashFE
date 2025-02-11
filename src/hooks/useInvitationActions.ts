import { useCallback } from "react";
import {
  acceptCollaboratorInvitation,
  rejectCollaboratorInvitation,
} from "@services/task.service";
import { showToast } from "@config/collabToast";
import { UseInvitationActionsParams } from "@interface/collabs/interfaces";

const useInvitationActions = ({
  collabInvite,
  setIsCollaborator,
  setCollaborationOwnerId,
  setCollabOwnerName,
  setCollabInvite,
}: UseInvitationActionsParams) => {
  const acceptInvite = useCallback(async () => {
    try {
      await acceptCollaboratorInvitation(collabInvite.ownerId);
      setIsCollaborator(true);
      setCollaborationOwnerId(collabInvite.ownerId);
      setCollabOwnerName(collabInvite.ownerName);
      setCollabInvite(null);
      showToast(
        "success",
        `You have accepted the invitation from ${collabInvite.ownerName}. You are now a collaborator and can move tasks to update their status.`
      );
    } catch (error) {
      // Solo se imprime el error si NO estamos en ambiente de test.
      if (process.env.NODE_ENV !== "test") {
        console.error("Error accepting invitation:", error);
      }
      showToast("error", "Failed to accept the invitation");
    }
  }, [
    collabInvite,
    setIsCollaborator,
    setCollaborationOwnerId,
    setCollabOwnerName,
    setCollabInvite,
  ]);

  const rejectInvite = useCallback(async () => {
    try {
      await rejectCollaboratorInvitation(collabInvite.ownerId);
      setCollabInvite(null);
      showToast("info", "You have rejected the invitation");
    } catch (error) {
      if (process.env.NODE_ENV !== "test") {
        console.error("Error rejecting invitation:", error);
      }
      showToast("error", "Failed to reject the invitation");
    }
  }, [collabInvite, setCollabInvite]);

  return { acceptInvite, rejectInvite };
};

export default useInvitationActions;
