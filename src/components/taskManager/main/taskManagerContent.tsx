import React, { useRef, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "@styles/TaskManager.css";
import "@styles/collaborators.css";

import { LazyTaskModal } from "@config/lazyLoader";
import { useTasksContext } from "@context/taskContext/taskContext";

import {
  useAutoFocus,
  useBackendTasks,
  useCollaboratorModal,
  useCollaborators,
  useColumns,
  useDragAndDrop,
  useExitCollaboration,
  useInvitationActions,
  useLogout,
  useScrollToBottom,
  useSocket,
  useTaskModal,
} from "@hooks/index";

import CollaboratorsSection from "@components/collab/collaboratorSection";

import TaskManagerHeader from "./taskManagerHeader";
import TaskBoard from "./taskBoard";

const TaskManagerContent: React.FC = () => {
  const {
    tasks,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    setTasks,
  } = useTasksContext();
  const {
    columns,
    reorderWithinColumn,
    moveTaskBetweenColumns,
    addTaskToColumn,
    removeTaskFromColumn,
    setColumns,
  } = useColumns();
  const {
    collaborators,
    addCollaborator,
    removeCollaborator,
    setCollaborators,
  } = useCollaborators();

  const {
    isModalOpen,
    isEditingTask,
    titleInput,
    descInput,
    openModal,
    closeModal,
    saveTask,
    setTitleInput,
    setDescInput,
  } = useTaskModal({ tasks, createTask, updateTask, addTaskToColumn });
  const {
    isCollaboratorModalOpen,
    collaboratorInput,
    openCollaboratorModal,
    closeCollaboratorModal,
    saveCollaborator,
    setCollaboratorInput,
  } = useCollaboratorModal({ addCollaborator });
  const collaboratorInputRef = useAutoFocus(isCollaboratorModalOpen);
  const containerRef = useRef<HTMLDivElement>(null);
  useScrollToBottom(containerRef, Object.values(tasks));

  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [filterDate, setFilterDate] = useState("");
  const [isCollaborator, setIsCollaborator] = useState(false);
  const [collabInvite, setCollabInvite] = useState<any>(null);
  const [collaborationOwnerId, setCollaborationOwnerId] = useState<
    number | null
  >(null);
  const [collabOwnerName, setCollabOwnerName] = useState<string | null>(null);
  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  useBackendTasks({
    isCollaborator,
    collaborationOwnerId,
    userId: currentUser.id,
    setTasks,
    setColumns,
  });

  const exitCollaboration = useExitCollaboration({
    isCollaborator,
    collaborationOwnerId,
    currentUserId: currentUser.id,
    setTasks,
    setColumns,
    setIsCollaborator,
    setCollaborationOwnerId,
    setCollabOwnerName,
  });

  const { acceptInvite, rejectInvite } = useInvitationActions({
    collabInvite,
    setIsCollaborator,
    setCollaborationOwnerId,
    setCollabOwnerName,
    setCollabInvite,
  });

  const applyTaskMove = (
    taskId: string,
    sourceColumnId: string,
    destinationColumnId: string,
    sourceIndex: number,
    destinationIndex: number,
    newStatus: string
  ) => {
    if (sourceColumnId === destinationColumnId) {
      reorderWithinColumn(
        sourceColumnId,
        sourceIndex,
        destinationIndex,
        taskId
      );
    } else {
      moveTaskBetweenColumns(
        sourceColumnId,
        destinationColumnId,
        sourceIndex,
        destinationIndex,
        taskId
      );
    }
    setTasks((prev) => ({
      ...prev,
      [taskId]: {
        ...prev[taskId],
        status: newStatus,
        completed: newStatus === "DONE",
      },
    }));
  };

  const handleDragStart = (event: any) => {
    setActiveTaskId(event.active.id.toString());
  };

  const socket = useSocket({
    userId: currentUser.id,
    setCollabInvite: setCollabInvite,
    setCollaborators: setCollaborators,
    setTasks,
    setColumns,
    handleExitCollaboration: exitCollaboration,
    applyTaskMove,
  });

  const { onDragEnd } = useDragAndDrop({
    updateTaskStatus,
    reorderWithinColumn,
    moveTaskBetweenColumns,
    socket,
    senderId: currentUser.id,
  });

  const handleDragEnd = (event: any) => {
    onDragEnd(event);
    setActiveTaskId(null);
  };

  const handleOpenModal = (taskId?: string) => {
    if (!isCollaborator) openModal(taskId);
  };

  const handleDeleteTask = (taskId: string, columnId: string) => {
    if (!isCollaborator) {
      deleteTask(taskId);
      removeTaskFromColumn(columnId, taskId);
    }
  };

  const logout = useLogout();

  return (
    <div className="task-manager-container" ref={containerRef}>
      <TaskManagerHeader
        filterDate={filterDate}
        setFilterDate={setFilterDate}
        isCollaborator={isCollaborator}
        handleOpenModal={() => handleOpenModal()}
      />
      <CollaboratorsSection
        collabInvite={collabInvite}
        handleAcceptInvite={acceptInvite}
        handleRejectInvite={rejectInvite}
        isCollaborator={isCollaborator}
        collabOwnerName={collabOwnerName}
        handleExitCollaboration={exitCollaboration}
        collaborators={collaborators}
        openCollaboratorModal={openCollaboratorModal}
        removeCollaborator={removeCollaborator}
        isCollaboratorModalOpen={isCollaboratorModalOpen}
        collaboratorInput={collaboratorInput}
        setCollaboratorInput={setCollaboratorInput}
        saveCollaborator={saveCollaborator}
        closeCollaboratorModal={closeCollaboratorModal}
        collaboratorInputRef={collaboratorInputRef}
      />
      <TaskBoard
        columns={columns}
        tasks={tasks}
        filterDate={filterDate}
        activeTaskId={activeTaskId}
        isCollaborator={isCollaborator}
        handleDragStart={handleDragStart}
        handleDragEnd={handleDragEnd}
        handleOpenModal={handleOpenModal}
        handleDeleteTask={handleDeleteTask}
      />
      {isModalOpen && (
        <LazyTaskModal
          isEditing={isEditingTask}
          title={titleInput}
          description={descInput}
          onClose={closeModal}
          onSave={saveTask}
          setTitle={setTitleInput}
          setDescription={setDescInput}
        />
      )}
      <ToastContainer />
      <button className="logout-button" onClick={logout}>
        <FiLogOut size={24} />
      </button>
    </div>
  );
};

export default TaskManagerContent;
