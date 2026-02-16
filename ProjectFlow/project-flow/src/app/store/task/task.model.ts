export interface Task {
  id: number;
  projectId: number;
  name: string;
  description: string;
  status: 'todo' | 'inProgress' | 'done';
  assignedTo?: string[];
  dueDate?: Date;
}

export interface TaskState {
  tasks: Task[];
  selectedTaskId: number | null;
  loading: boolean;
  error: string | null;
}