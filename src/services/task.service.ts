import api from "@api/axios";
import { CreateTaskData, UpdateTaskData } from "@interface/services/interfaces";

const tasksEndpoint = import.meta.env.VITE_TASKS_ENDPOINT;
const collaboratorsEndpoint = import.meta.env.VITE_COLLABORATORS_ENDPOINT;

export const fetchTasks = async (ownerId?: number) => {
  const params = ownerId ? { ownerId } : {};
  const response = await api.get(tasksEndpoint, { params });
  return response.data;
};

export const createTask = async (data: CreateTaskData) => {
  const response = await api.post(tasksEndpoint, data);
  return response.data;
};

export const updateTask = async (taskId: string, data: UpdateTaskData) => {
  const response = await api.put(`${tasksEndpoint}/${taskId}`, data);
  return response.data;
};

export const updateTaskStatus = async (taskId: string, status: string) => {
  const response = await api.put(`${tasksEndpoint}/${taskId}`, { status });
  return response.data;
};

export const deleteTask = async (taskId: string) => {
  await api.delete(`${tasksEndpoint}/${taskId}`);
};

export const toggleTaskCompletion = async (
  taskId: string,
  completed: boolean
) => {
  const response = await api.patch(`${tasksEndpoint}/${taskId}`, { completed });
  return response.data;
};

export const fetchCollaborators = async () => {
  const response = await api.get(collaboratorsEndpoint);
  return response.data;
};

export const createCollaborator = async (data: { identifier: string }) => {
  const response = await api.post(collaboratorsEndpoint, data);
  return response.data;
};

export const deleteCollaborator = async (collaboratorId: string) => {
  await api.delete(`${collaboratorsEndpoint}/${collaboratorId}`);
};

export const acceptCollaboratorInvitation = async (ownerId: number) => {
  const response = await api.post(`${collaboratorsEndpoint}/accept`, {
    ownerId,
  });
  return response.data;
};

export const rejectCollaboratorInvitation = async (ownerId: number) => {
  const response = await api.post(`${collaboratorsEndpoint}/reject`, {
    ownerId,
  });
  return response.data;
};

export const leaveCollaboration = async (ownerId: number) => {
  const response = await api.delete(`${collaboratorsEndpoint}/leave`, {
    params: { ownerId },
  });
  return response.data;
};
