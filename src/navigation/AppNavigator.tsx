"use client"

import { useContext } from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Ionicons } from "@expo/vector-icons"

import { AuthContext } from "../services/AuthContext"
import LoginScreen from "../screens/LoginScreen"
import RegisterScreen from "../screens/RegisterScreen"
import TaskListScreen from "../screens/TaskListScreen"
import AddTaskScreen from "../screens/AddTaskScreen"
import ProfileScreen from "../screens/ProfileScreen"
import TaskDetailScreen from "../screens/TaskDetailScreen"

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function AuthStack() {
  return (
    <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  )
}

function MainTabs() {
  return (
    <Tab.Navigator
      id={undefined}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap

          if (route.name === "Tasks") {
            iconName = focused ? "list" : "list-outline"
          } else if (route.name === "AddTask") {
            iconName = focused ? "add-circle" : "add-circle-outline"
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline"
          } else {
            iconName = "help-outline"
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
        headerStyle: {
          backgroundColor: "#007AFF",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      })}
    >
      <Tab.Screen name="Tasks" component={TaskListScreen} options={{ title: "My Tasks" }} />
      <Tab.Screen name="AddTask" component={AddTaskScreen} options={{ title: "Add Task" }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: "Profile" }} />
    </Tab.Navigator>
  )
}

function MainStack() {
  return (
    <Stack.Navigator id={undefined}>
      <Stack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
      <Stack.Screen name="TaskDetail" component={TaskDetailScreen} options={{ title: "Task Details" }} />
    </Stack.Navigator>
  )
}

export default function AppNavigator() {
  const { user, loading } = useContext(AuthContext)

  if (loading) {
    return null 
  }

  return user ? <MainStack /> : <AuthStack />
}
