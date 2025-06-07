"use client"

import { useContext, useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, TextInput } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { TaskContext } from "../services/TaskContext"
import type { Task } from "../services/types"

export default function TaskDetailScreen({ route, navigation }: any) {
  const { taskId } = route.params
  const { tasks, updateTask, deleteTask } = useContext(TaskContext)
  const [task, setTask] = useState<Task | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState("")
  const [editDescription, setEditDescription] = useState("")

  useEffect(() => {
    const foundTask = tasks.find((t) => t.id === taskId)
    if (foundTask) {
      setTask(foundTask)
      setEditTitle(foundTask.title)
      setEditDescription(foundTask.description)
    }
  }, [taskId, tasks])

  const handleToggleComplete = async () => {
    if (task) {
      await updateTask(task.id, { completed: !task.completed })
    }
  }

  const handleSaveEdit = async () => {
    if (task && editTitle.trim()) {
      await updateTask(task.id, {
        title: editTitle.trim(),
        description: editDescription.trim(),
      })
      setIsEditing(false)
    }
  }

  const handleDelete = () => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          if (task) {
            await deleteTask(task.id)
            navigation.goBack()
          }
        },
      },
    ])
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

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return "alert-circle"
      case "medium":
        return "warning"
      case "low":
        return "checkmark-circle"
      default:
        return "help-circle"
    }
  }

  if (!task) {
    return (
      <View style={styles.container}>
        <Text>Task not found</Text>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Task Status */}
        <View style={styles.statusContainer}>
          <TouchableOpacity
            style={[styles.statusButton, task.completed ? styles.statusCompleted : styles.statusPending]}
            onPress={handleToggleComplete}
          >
            <Ionicons
              name={task.completed ? "checkmark-circle" : "ellipse-outline"}
              size={24}
              color={task.completed ? "#34C759" : "#666"}
            />
            <Text style={[styles.statusText, task.completed && styles.statusTextCompleted]}>
              {task.completed ? "Completed" : "Mark as Complete"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Task Details */}
        <View style={styles.detailsContainer}>
          {isEditing ? (
            <View style={styles.editContainer}>
              <TextInput
                style={styles.editTitle}
                value={editTitle}
                onChangeText={setEditTitle}
                placeholder="Task title"
                multiline
              />
              <TextInput
                style={styles.editDescription}
                value={editDescription}
                onChangeText={setEditDescription}
                placeholder="Task description"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
              <View style={styles.editButtons}>
                <TouchableOpacity style={styles.saveButton} onPress={handleSaveEdit}>
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={() => setIsEditing(false)}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View>
              <Text style={[styles.title, task.completed && styles.titleCompleted]}>{task.title}</Text>
              {task.description ? (
                <Text style={[styles.description, task.completed && styles.descriptionCompleted]}>
                  {task.description}
                </Text>
              ) : null}
            </View>
          )}
        </View>

        {/* Task Meta Information */}
        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <Ionicons name={getPriorityIcon(task.priority)} size={20} color={getPriorityColor(task.priority)} />
            <Text style={styles.metaLabel}>Priority</Text>
            <Text style={[styles.metaValue, { color: getPriorityColor(task.priority) }]}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </Text>
          </View>

          <View style={styles.metaItem}>
            <Ionicons name="calendar-outline" size={20} color="#666" />
            <Text style={styles.metaLabel}>Due Date</Text>
            <Text style={styles.metaValue}>{new Date(task.dueDate).toLocaleDateString()}</Text>
          </View>

          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={20} color="#666" />
            <Text style={styles.metaLabel}>Created</Text>
            <Text style={styles.metaValue}>{new Date(task.createdAt).toLocaleDateString()}</Text>
          </View>
        </View>

        {/* Action Buttons */}
        {!isEditing && (
          <View style={styles.actionContainer}>
            <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
              <Ionicons name="create-outline" size={20} color="#007AFF" />
              <Text style={styles.editButtonText}>Edit Task</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
              <Ionicons name="trash-outline" size={20} color="#FF3B30" />
              <Text style={styles.deleteButtonText}>Delete Task</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  content: {
    padding: 20,
  },
  statusContainer: {
    marginBottom: 20,
  },
  statusButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statusCompleted: {
    backgroundColor: "#f0f9f0",
  },
  statusPending: {
    backgroundColor: "#fff",
  },
  statusText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginLeft: 10,
  },
  statusTextCompleted: {
    color: "#34C759",
  },
  detailsContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  titleCompleted: {
    textDecorationLine: "line-through",
    color: "#666",
  },
  description: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
  },
  descriptionCompleted: {
    textDecorationLine: "line-through",
  },
  editContainer: {
    gap: 15,
  },
  editTitle: {
    fontSize: 18,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 10,
  },
  editDescription: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    minHeight: 100,
  },
  editButtons: {
    flexDirection: "row",
    gap: 10,
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  cancelButtonText: {
    color: "#666",
    fontWeight: "600",
  },
  metaContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  metaLabel: {
    fontSize: 16,
    color: "#666",
    marginLeft: 10,
    flex: 1,
  },
  metaValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  actionContainer: {
    gap: 10,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  editButtonText: {
    color: "#007AFF",
    fontWeight: "600",
    marginLeft: 8,
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FF3B30",
  },
  deleteButtonText: {
    color: "#FF3B30",
    fontWeight: "600",
    marginLeft: 8,
  },
})
