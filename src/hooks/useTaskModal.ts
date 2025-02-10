import { useState } from "react";
import { UseTaskModalProps } from "@interface/tasks/interfaces";

const useTaskModal = ({
  tasks,
  createTask,
  updateTask,
  addTaskToColumn,
}: UseTaskModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditingTask, setIsEditingTask] = useState(false);
  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  const [titleInput, setTitleInput] = useState("");
  const [descInput, setDescInput] = useState("");

  const openModal = (taskId?: string) => {
    setIsEditingTask(!!taskId);
    setEditTaskId(taskId || null);
    setTitleInput(taskId ? tasks[taskId].title : "");
    setDescInput(taskId ? tasks[taskId].description : "");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTitleInput("");
    setDescInput("");
    setIsEditingTask(false);
    setEditTaskId(null);
  };

  const saveTask = async () => {
    if (isEditingTask && editTaskId) {
      await updateTask(editTaskId, titleInput, descInput);
    } else {
      const newTask = await createTask(titleInput, descInput);
      addTaskToColumn("column-1", newTask.id);
    }
    closeModal();
  };

  return {
    isModalOpen,
    isEditingTask,
    editTaskId,
    titleInput,
    descInput,
    openModal,
    closeModal,
    saveTask,
    setTitleInput,
    setDescInput,
  };
};

export default useTaskModal;