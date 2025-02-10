export interface SignInPayload {
  email: string;
  password: string;
}

export interface SignUpPayload {
  username: string;
  email: string;
  password: string;
}

export interface CreateTaskData {
  title: string;
  description: string;
  date?: string;
}

export interface UpdateTaskData {
  title?: string;
  description?: string;
  status?: string;
  completed?: boolean;
}
