export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

export interface Comment {
  id: number;
  taskId: number;
  author: User;
  content: string;
  createdAt: Date;
}