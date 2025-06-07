import { NavigationContainer } from "@react-navigation/native"
import { StatusBar } from "expo-status-bar"
import { AuthProvider } from "./src/services/AuthContext"
import { TaskProvider } from "./src/services/TaskContext"
import AppNavigator from "./src/navigation/AppNavigator"

export default function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <AppNavigator />
        </NavigationContainer>
      </TaskProvider>
    </AuthProvider>
  )
}
