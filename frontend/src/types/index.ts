export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

export type CreateTaskInput = Pick<Task, 'title' | 'description'>;
export type UpdateTaskInput = Partial<CreateTaskInput>;

export type ErrorType = "NETWORK_ERROR" | "SERVER_ERROR" | "CLIENT_ERROR" | "UNKNOWN";

export interface NormalizedError {
  type: ErrorType;
  message: string;
  statusCode: number | null;
  details: any;
  timestamp: string;
}
