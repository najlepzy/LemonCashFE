export interface CollaboratorInviteModalProps {
  ownerName: string;
  onAccept: () => void;
  onReject: () => void;
}
export interface CollaboratorsSectionProps {
  collabInvite: any;
  handleAcceptInvite: () => void;
  handleRejectInvite: () => void;
  isCollaborator: boolean;
  collabOwnerName: string | null;
  handleExitCollaboration: () => void;
  collaborators: any;
  openCollaboratorModal: () => void;
  removeCollaborator: (id: string) => void;
  isCollaboratorModalOpen: boolean;
  collaboratorInput: string;
  setCollaboratorInput: (value: string) => void;
  saveCollaborator: () => void;
  closeCollaboratorModal: () => void;
  collaboratorInputRef: React.RefObject<HTMLInputElement>;
}

export interface UseInvitationActionsParams {
  collabInvite: any;
  setIsCollaborator: React.Dispatch<React.SetStateAction<boolean>>;
  setCollaborationOwnerId: React.Dispatch<React.SetStateAction<number | null>>;
  setCollabOwnerName: React.Dispatch<React.SetStateAction<string | null>>;
  setCollabInvite: React.Dispatch<React.SetStateAction<any>>;
}
export interface CollaboratorModalProps {
  collaboratorInput: string;
  setCollaboratorInput: (value: string) => void;
  onSave: () => void;
  onClose: () => void;
  inputRef?: React.RefObject<HTMLInputElement>;
}

export interface Collaborator {
  id: string;
  name: string;
  accepted?: boolean;
}

export interface CollaboratorListProps {
  collaborators: Collaborator[];
  onOpenModal: () => void;
  onDelete: (id: string) => void;
}

export interface UseCollaboratorModalProps {
  addCollaborator: (collaborator: string) => void;
}