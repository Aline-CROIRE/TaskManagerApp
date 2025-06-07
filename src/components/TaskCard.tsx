"use client"

import { useContext } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { TaskContext } from "../services/TaskContext"
import type { Task } from "../services/types"

interface TaskCardProps {
  task: Task
  onPress: () => void
}

export default function TaskCard({ task, onPress }: TaskCardProps) {
  const { updateTask } = useContext(TaskContext)

  const handleToggleComplete = async (e: any) => {
    e.stopPropagation()
    await updateTask(task.id, { completed: !task.completed })
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "#FF3B30"
      case "medium":
        return "#FF9500"
      case "low":
        return "#34C759"
      default:
        return "#007AFF"
    }
  }

  const isOverdue = new Date(task.dueDate) < new Date() && !task.completed

  return (
    <TouchableOpacity
      style={[styles.container, task.completed && styles.containerCompleted, isOverdue && styles.containerOverdue]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        {/* Checkbox */}
        <TouchableOpacity style={styles.checkbox} onPress={handleToggleComplete}>
          <Ionicons
            name={task.completed ? "checkmark-circle" : "ellipse-outline"}
            size={24}
            color={task.completed ? "#34C759" : "#ccc"}
          />
        </TouchableOpacity>

        {/* Task Info */}
        <View style={styles.taskInfo}>
          <Text style={[styles.title, task.completed && styles.titleCompleted]}>{task.title}</Text>

          {task.description ? (
            <Text style={[styles.description, task.completed && styles.descriptionCompleted]} numberOfLines={2}>
              {task.description}
            </Text>
          ) : null}

          <View style={styles.meta}>
            {/* Priority Badge */}
            <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(task.priority) + "20" }]}>
              <Text style={[styles.priorityText, { color: getPriorityColor(task.priority) }]}>
                {task.priority.toUpperCase()}
              </Text>
            </View>

            {/* Due Date */}
            <View style={styles.dateContainer}>
              <Ionicons name="calendar-outline" size={14} color={isOverdue ? "#FF3B30" : "#666"} />
              <Text style={[styles.dateText, isOverdue && styles.dateTextOverdue]}>
                {new Date(task.dueDate).toLocaleDateString()}
              </Text>
            </View>
          </View>
        </View>

        {/* Arrow */}
        <Ionicons name="chevron-forward" size={20} color="#ccc" />
      </View>

      {/* Overdue Indicator */}
      {isOverdue && (
        <View style={styles.overdueIndicator}>
          <Ionicons name="warning" size={12} color="#FF3B30" />
          <Text style={styles.overdueText}>Overdue</Text>
        </View>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  containerCompleted: {
    opacity: 0.7,
  },
  containerOverdue: {
    borderLeftWidth: 4,
    borderLeftColor: "#FF3B30",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  checkbox: {
    marginRight: 12,
  },
  taskInfo: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  titleCompleted: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    lineHeight: 20,
  },
  descriptionCompleted: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  meta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: "bold",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
  dateTextOverdue: {
    color: "#FF3B30",
    fontWeight: "600",
  },
  overdueIndicator: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF3B30",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  overdueText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
    marginLeft: 4,
  },
})
