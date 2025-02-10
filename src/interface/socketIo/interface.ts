import { Column, Task } from "@interface/tasks/interfaces";

export interface UseSocketParams {
  userId: number;
  setCollabInvite: (data: any) => void;
  setCollaborators: React.Dispatch<React.SetStateAction<any[]>>;
  setTasks: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  setColumns: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  handleExitCollaboration: () => void;
  applyTaskMove: (
    taskId: string,
    sourceColumnId: string,
    destinationColumnId: string,
    sourceIndex: number,
    destinationIndex: number,
    newStatus: string
  ) => void;
}

export interface UseBackendTasksParams {
  isCollaborator: boolean;
  collaborationOwnerId: number | null;
  userId: number;
  setTasks: React.Dispatch<React.SetStateAction<Record<string, Task>>>;
  setColumns: React.Dispatch<React.SetStateAction<Record<string, Column>>>;
}

export interface TaskBoardProps {
  columns: Record<string, Column>;
  tasks: Record<string, Task>;
  filterDate: string;
  activeTaskId: string | null;
  isCollaborator: boolean;
  handleDragStart: (event: any) => void;
  handleDragEnd: (event: any) => void;
  handleOpenModal: (taskId?: string) => void;
  handleDeleteTask: (taskId: string, columnId: string) => void;
}