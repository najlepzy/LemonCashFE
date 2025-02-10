import { UseCollaboratorModalProps } from "@interface/collabs/interfaces";
import { useState } from "react";


const useCollaboratorModal = ({
  addCollaborator,
}: UseCollaboratorModalProps) => {
  const [isCollaboratorModalOpen, setIsCollaboratorModalOpen] = useState(false);
  const [collaboratorInput, setCollaboratorInput] = useState("");

  const openCollaboratorModal = () => {
    setCollaboratorInput("");
    setIsCollaboratorModalOpen(true);
  };

  const closeCollaboratorModal = () => {
    setIsCollaboratorModalOpen(false);
    setCollaboratorInput("");
  };

  const saveCollaborator = () => {
    addCollaborator(collaboratorInput);
    closeCollaboratorModal();
  };

  return {
    isCollaboratorModalOpen,
    collaboratorInput,
    openCollaboratorModal,
    closeCollaboratorModal,
    saveCollaborator,
    setCollaboratorInput,
  };
};

export default useCollaboratorModal;