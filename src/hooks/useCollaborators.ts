import { useState, useEffect } from "react";
import { showToast } from "@config/collabToast";

import {
  fetchCollaborators,
  createCollaborator,
  deleteCollaborator,
} from "@services/task.service";
import { Collaborator } from "@interface/collabs/interfaces";

const useCollaborators = () => {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);

  useEffect(() => {
    const loadCollaborators = async () => {
      try {
        const response = await fetchCollaborators();
        let collaboratorsArray: Collaborator[] = [];

        if (response && response.data && Array.isArray(response.data)) {
          collaboratorsArray = response.data.map((col: any) => ({
            id: col.id,
            name: col.email,
          }));
        } else if (Array.isArray(response)) {
          collaboratorsArray = response.map((col: any) => ({
            id: col.id,
            name: col.email,
          }));
        } else {
          console.warn(
            "Unexpected response format from fetchCollaborators:",
            response
          );
        }

        setCollaborators(collaboratorsArray);
      } catch (error) {
        console.error("Error fetching collaborators:", error);
        showToast("error", "Error fetching collaborators");
      }
    };

    loadCollaborators();
  }, []);

  const addCollaboratorHandler = async (identifier: string) => {
    if (!identifier.trim()) {
      showToast("error", "Please enter a username or email");
      return;
    }
    try {
      await createCollaborator({ identifier: identifier.trim() });
      showToast("success", "Invitation sent to the collaborator!");
    } catch (error) {
      console.error("Error adding collaborator:", error);
      showToast("error", "Error adding collaborator");
    }
  };

  const removeCollaboratorHandler = async (id: string) => {
    try {
      await deleteCollaborator(id);
      setCollaborators((prev) => prev.filter((collab) => collab.id !== id));
      showToast("success", "Collaborator removed successfully");
    } catch (error) {
      console.error("Error removing collaborator:", error);
      showToast("error", "Error removing collaborator");
    }
  };

  return {
    collaborators,
    addCollaborator: addCollaboratorHandler,
    removeCollaborator: removeCollaboratorHandler,
    setCollaborators,
  };
};

export default useCollaborators;