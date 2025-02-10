export const COLLAB_INVITE_TEXT = {
  TITLE: "Collaboration Invitation",
  MESSAGE: (ownerName: string) =>
    `You have been invited to collaborate on ${ownerName}'s board.`,
};

export const COLLAB_LIST_TEXT = {
  ADD_COLLABORATOR: "Add new collaborator",
  REMOVE_COLLABORATOR: "Remove collaborator",
};

export const COLLAB_MODAL_TEXT = {
  TITLE: "Invite Collaborator",
  LABEL: "Enter collaborator's email or username",
  CANCEL: "Cancel",
  SAVE: "Save",
};

export const COLLAB_SECTION_TEXT = {
  COLLABORATING_MESSAGE: (ownerName: string) =>
    `You are collaborating on ${ownerName}'s board`,
  LEAVE_COLLABORATION: "Leave collaboration",
};

export const COLLAB_TOAST_TEXT = {
  FETCH_ERROR: "Error fetching collaborators",
  EMPTY_INPUT: "Please enter a username or email",
  ADD_ERROR: "Error adding collaborator",
  ADD_SUCCESS: "Invitation sent to the collaborator!",
  REMOVE_SUCCESS: "Collaborator removed successfully",
  REMOVE_ERROR: "Error removing collaborator",
};