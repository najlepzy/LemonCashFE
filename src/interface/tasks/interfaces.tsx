export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  status: string;
}

export interface BackendTask {
  id: number;
  title: string;
  description: string;
  status: string;
  creatorId: number;
  createdAt: string;
}

export interface TaskCardProps {
  task: Task;
  index: number;
  columnId: string;
  onEdit: (taskId: string) => void;
  onDelete: (taskId: string, columnId: string) => void;
}

export interface TaskColumnProps {
  column: Column;
  tasks: Record<string, Task>;
  onEdit: (taskId: string) => void;
  onDelete: (taskId: string, columnId: string) => void;
}
export interface TaskManagerHeaderProps {
  filterDate: string;
  setFilterDate: (date: string) => void;
  isCollaborator: boolean;
  handleOpenModal: () => void;
}

export interface TaskColumnWithFilterProps extends TaskColumnProps {
  filterDate?: string;
}

export interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

export interface UseColumnsReturn {
  columns: Record<string, Column>;
  reorderWithinColumn: (
    columnId: string,
    sourceIndex: number,
    destinationIndex: number,
    draggableId: string
  ) => void;
  moveTaskBetweenColumns: (
    sourceColumnId: string,
    destinationColumnId: string,
    _sourceIndex: number,
    destinationIndex: number,
    draggableId: string
  ) => void;
  addTaskToColumn: (columnId: string, taskId: string) => void;
  removeTaskFromColumn: (columnId: string, taskId: string) => void;
  setColumns: React.Dispatch<React.SetStateAction<Record<string, Column>>>;
}

export interface TaskModalProps {
  isEditing: boolean;
  title: string;
  description: string;
  onClose: () => void;
  onSave: () => void;
  setTitle: (value: string) => void;
  setDescription: (value: string) => void;
}

export interface UseExitCollaborationParams {
  isCollaborator: boolean;
  collaborationOwnerId: number | null;
  currentUserId: number;
  setTasks: React.Dispatch<React.SetStateAction<Record<string, Task>>>;
  setColumns: React.Dispatch<React.SetStateAction<Record<string, Column>>>;
  setIsCollaborator: React.Dispatch<React.SetStateAction<boolean>>;
  setCollaborationOwnerId: React.Dispatch<React.SetStateAction<number | null>>;
  setCollabOwnerName: React.Dispatch<React.SetStateAction<string | null>>;
}
export interface UseTasksReturn {
  tasks: Record<string, Task>;
  setTasks: React.Dispatch<React.SetStateAction<Record<string, Task>>>;
  createTask: (title: string, description: string) => Promise<Task>;
  updateTask: (
    taskId: string,
    title: string,
    description: string
  ) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  toggleTaskCompletion: (taskId: string, completed: boolean) => Promise<void>;
  updateTaskStatus: (taskId: string, status: string) => Promise<void>;
}

export interface UseTaskModalProps {
  tasks: Record<string, Task>;
  createTask: (title: string, description: string) => Promise<Task>;
  updateTask: (id: string, title: string, description: string) => Promise<void>;
  addTaskToColumn: (columnId: string, taskId: string) => void;
}

export interface UseDragAndDropProps {
  updateTaskStatus: (taskId: string, status: string) => void;
  reorderWithinColumn: (
    columnId: string,
    startIndex: number,
    endIndex: number,
    draggableId: string
  ) => void;
  moveTaskBetweenColumns: (
    sourceColumnId: string,
    destinationColumnId: string,
    startIndex: number,
    endIndex: number,
    draggableId: string
  ) => void;
  toggleTaskCompletion?: (taskId: string, isComplete: boolean) => void;
}

export interface DateFilterProps {
  filterDate: string;
  setFilterDate: (date: string) => void;
}

export interface ExtendedTaskColumnProps extends TaskColumnWithFilterProps {
  isCollaborator: boolean;
}
export interface ExtendedTaskCardProps extends TaskCardProps {
  isCollaborator?: boolean;
}
export interface TaskToastProps {
  type: "success" | "error" | "info";
  message: React.ReactNode;
}
