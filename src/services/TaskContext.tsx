"use client"

import { createContext, useState, useContext, type ReactNode } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import type { Task } from "./types"
import { AuthContext } from "./AuthContext"

interface TaskContextType {
  tasks: Task[]
  loading: boolean
  addTask: (task: Omit<Task, "id" | "createdAt" | "userId">) => Promise<void>
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>
  deleteTask: (id: string) => Promise<void>
  refreshTasks: () => Promise<void>
}

export const TaskContext = createContext<TaskContextType>({
  tasks: [],
  loading: false,
  addTask: async () => {},
  updateTask: async () => {},
  deleteTask: async () => {},
  refreshTasks: async () => {},
})

// Mock initial tasks
const initialTasks: Task[] = [
  {
    id: "1",
    title: "Complete React Native Tutorial",
    description: "Finish watching the entire React Native course and take notes",
    completed: false,
    priority: "high",
    dueDate: "2024-12-10",
    createdAt: "2024-12-07",
    userId: "1",
  },
  {
    id: "2",
    title: "Build Weekend Assignment",
    description: "Create a task manager app demonstrating all core concepts",
    completed: false,
    priority: "high",
    dueDate: "2024-12-09",
    createdAt: "2024-12-07",
    userId: "1",
  },
  {
    id: "3",
    title: "Setup GitHub Repository",
    description: "Create repo with proper README and documentation",
    completed: true,
    priority: "medium",
    dueDate: "2024-12-08",
    createdAt: "2024-12-07",
    userId: "1",
  },
]

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(false)
  const { user } = useContext(AuthContext)

  const refreshTasks = async () => {
    if (!user) return

    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      const storedTasks = await AsyncStorage.getItem(`tasks_${user.id}`)
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks))
      } else {
        // Load initial tasks for new users
        const userTasks = initialTasks.filter((task) => task.userId === user.id)
        setTasks(userTasks)
        await AsyncStorage.setItem(`tasks_${user.id}`, JSON.stringify(userTasks))
      }
    } catch (error) {
      console.error("Error loading tasks:", error)
    } finally {
      setLoading(false)
    }
  }

  const saveTasks = async (updatedTasks: Task[]) => {
    if (!user) return

    try {
      await AsyncStorage.setItem(`tasks_${user.id}`, JSON.stringify(updatedTasks))
    } catch (error) {
      console.error("Error saving tasks:", error)
    }
  }

  const addTask = async (taskData: Omit<Task, "id" | "createdAt" | "userId">) => {
    if (!user) return

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      const newTask: Task = {
        ...taskData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split("T")[0],
        userId: user.id,
      }

      const updatedTasks = [newTask, ...tasks]
      setTasks(updatedTasks)
      await saveTasks(updatedTasks)
    } catch (error) {
      console.error("Error adding task:", error)
      throw error
    }
  }

  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300))

      const updatedTasks = tasks.map((task) => (task.id === id ? { ...task, ...updates } : task))

      setTasks(updatedTasks)
      await saveTasks(updatedTasks)
    } catch (error) {
      console.error("Error updating task:", error)
      throw error
    }
  }

  const deleteTask = async (id: string) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300))

      const updatedTasks = tasks.filter((task) => task.id !== id)
      setTasks(updatedTasks)
      await saveTasks(updatedTasks)
    } catch (error) {
      console.error("Error deleting task:", error)
      throw error
    }
  }

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        addTask,
        updateTask,
        deleteTask,
        refreshTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}
