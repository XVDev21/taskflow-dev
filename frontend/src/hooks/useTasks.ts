import { useState, useCallback, useEffect } from 'react';
import { Task, CreateTaskInput, UpdateTaskInput, NormalizedError } from '../types';
import { taskApi } from '../api/tasks';
import { useAsync } from './useAsync';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { loading, error, execute } = useAsync<Task[]>();
  const [lastError, setLastError] = useState<NormalizedError | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLastError(null);
      const data = await execute(() => taskApi.getTasks());
      setTasks(data);
    } catch (err) {
      setLastError(err as NormalizedError);
      console.error('Failed to fetch tasks:', err);
    }
  }, [execute]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async (input: CreateTaskInput) => {
    try {
      const newTask = await taskApi.createTask(input);
      setTasks((prev) => [newTask, ...prev]);
      setLastError(null);
    } catch (err) {
      setLastError(err as NormalizedError);
      throw err;
    }
  };

  const updateTask = async (id: string, input: UpdateTaskInput) => {
    try {
      const updatedTask = await taskApi.updateTask(id, input);
      setTasks((prev) => prev.map((t) => (t.id === id ? updatedTask : t)));
      setLastError(null);
    } catch (err) {
      setLastError(err as NormalizedError);
      throw err;
    }
  };

  const toggleTask = async (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    // Optimistic update
    const originalTasks = [...tasks];
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );

    try {
      await taskApi.toggleTask(id);
      setLastError(null);
    } catch (err) {
      setTasks(originalTasks); // Rollback
      setLastError(err as NormalizedError);
      throw err;
    }
  };

  const deleteTask = async (id: string) => {
    // Optimistic update
    const originalTasks = [...tasks];
    setTasks((prev) => prev.filter((t) => t.id !== id));

    try {
      await taskApi.deleteTask(id);
      setLastError(null);
    } catch (err) {
      setTasks(originalTasks); // Rollback
      setLastError(err as NormalizedError);
      throw err;
    }
  };

  return {
    tasks,
    loading,
    error: error || lastError,
    addTask,
    updateTask,
    toggleTask,
    deleteTask,
    refresh: fetchTasks,
    retry: fetchTasks,
  };
}
