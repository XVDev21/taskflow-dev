import apiClient from './client';
import { Task, CreateTaskInput, UpdateTaskInput } from '../types';

export const taskApi = {
  getTasks: async (): Promise<Task[]> => {
    const { data } = await apiClient.get<Task[]>('tasks/');
    return data;
  },

  getTask: async (id: string): Promise<Task> => {
    const { data } = await apiClient.get<Task>(`tasks/${id}/`);
    return data;
  },

  createTask: async (task: CreateTaskInput): Promise<Task> => {
    const { data } = await apiClient.post<Task>('tasks/', task);
    return data;
  },

  updateTask: async (id: string, task: UpdateTaskInput): Promise<Task> => {
    const { data } = await apiClient.put<Task>(`tasks/${id}/`, task);
    return data;
  },

  toggleTask: async (id: string): Promise<Task> => {
    const { data: currentTask } = await apiClient.get<Task>(`tasks/${id}/`);
    const { data } = await apiClient.patch<Task>(`tasks/${id}/`, { 
      completed: !currentTask.completed 
    });
    return data;
  },

  deleteTask: async (id: string): Promise<void> => {
    await apiClient.delete(`tasks/${id}/`);
  },
};
