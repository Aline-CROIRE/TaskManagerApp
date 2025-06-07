export interface Task {
  id: string
  title: string
  description: string
  completed: boolean
  priority: "low" | "medium" | "high"
  dueDate: string
  createdAt: string
  userId: string
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  createdAt: string
}

export type RootStackParamList = {
  Login: undefined
  Register: undefined
  MainTabs: undefined
  TaskDetail: { taskId: string }
}

export type TabParamList = {
  Tasks: undefined
  AddTask: undefined
  Profile: undefined
}
