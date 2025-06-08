# 📱 Task Manager

A comprehensive task management mobile application built with React Native and Expo, demonstrating core mobile development concepts including authentication, navigation, forms, and real-time database operations.

## 🚀 Features Implemented



1. **Native Components & Styling**
   - Custom styled components with responsive design
   - Multiple screen layouts optimized for mobile
   - Consistent UI theme with proper spacing and typography
   - Adaptive layouts for different screen sizes

2. **Navigation System**
   - Tab-based navigation between main sections
   - Stack navigation for detailed views
   - Smooth screen transitions and proper navigation flow
   - Protected routes requiring authentication
   - Navigation between 5+ screens (Login, Register, Tasks, Add Task, Task Detail, Profile)

3. **Forms & User Input**
   - Login and registration forms with validation
   - Task creation and editing forms
   - Input validation and error handling
   - Proper state management for form data
   - Date picker integration

4. **Authentication Flow**
   - User registration and login functionality
   - Session management with AsyncStorage
   - Protected screens and routes
   - Secure logout with state cleanup
   - User profile management

5. **Database Integration**
   - Full CRUD operations (Create, Read, Update, Delete tasks)
   - Real-time task updates and synchronization
   - Data persistence with AsyncStorage
   - Optimistic UI updates for better user experience
   - User-specific data isolation

## 🛠 Technologies Used

- **React Native** - Mobile app framework
- **Expo** - Development platform and tools
- **TypeScript** - Type-safe JavaScript
- **React Navigation** - Navigation library
- **AsyncStorage** - Local data persistence
- **React Context API** - State management
- **Expo Vector Icons** - Icon library

## 📱 App Screens

### 1. Authentication Screens
- **Login Screen**: Email/password authentication with validation
- **Register Screen**: User registration with form validation

### 2. Main Application Screens
- **Task List Screen**: Display all tasks with filtering and completion status
- **Add Task Screen**: Create new tasks with priority, due date, and description
- **Task Detail Screen**: View and edit individual task details
- **Profile Screen**: User information, statistics, and settings

## 🚀 Setup and Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Expo Go app on your mobile device

### Installation Steps

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/react-native-task-manager.git
   cd react-native-task-manager
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Start the development server**
   \`\`\`bash
   expo start
   \`\`\`

4. **Test on mobile device**
   - Install Expo Go app on your phone
   - Scan the QR code displayed in terminal/browser
   - App will load on your device

## 📱 QR Code for Testing

![QR Code](./docs/screenshots/expo-qr-code.png)

*Scan this QR code with Expo Go app to test the application*

## 📸 Screenshots

### Authentication Flow
![Login Screen](./docs/screenshots/login-screen.png)
![Register Screen](./docs/screenshots/register-screen.png)

### Main Application
![Task List](./docs/screenshots/task-list.png)
![Add Task](./docs/screenshots/add-task.png)
![Task Detail](./docs/screenshots/task-detail.png)
![Profile Screen](./docs/screenshots/profile-screen.png)

## 🎯 Key Features Demonstrated

### Authentication & Security
- Secure user registration and login
- Protected routes and session management
- Form validation and error handling
- User profile management
- Data isolation per user

### Task Management
- Create, read, update, and delete tasks
- Task prioritization (Low, Medium, High)
- Due date tracking with overdue indicators
- Completion status toggle
- Real-time updates and persistence

### User Experience
- Responsive design for various screen sizes
- Smooth animations and transitions
- Intuitive navigation patterns
- Loading states and error handling
- Optimistic UI updates
- Pull-to-refresh functionality

### Data Management
- Local data persistence with AsyncStorage
- Context API for state management
- CRUD operations with simulated API calls
- User-specific data storage

## 🧪 Testing Checklist

- [x] App loads without crashes on iOS and Android
- [x] Authentication flow works correctly (login/register/logout)
- [x] Navigation between screens is smooth
- [x] Forms submit and validate properly
- [x] Tasks can be created, edited, and deleted
- [x] Data persists across app sessions
- [x] Responsive design works on different screen sizes
- [x] Real-time updates function correctly
- [x] Pull-to-refresh works on task list
- [x] Task completion toggle works
- [x] Priority and due date features work
- [x] User profile displays correct information

## 🎥 Demo Video

[Link to demo video or GIF showing app functionality]

## 🚧 Challenges Faced & Solutions

### 1. State Management Complexity
**Challenge**: Managing complex state across multiple screens and components.
**Solution**: Implemented React Context API for global state management with separate contexts for authentication and tasks.

### 2. Data Persistence
**Challenge**: Ensuring data persists across app sessions without a backend.
**Solution**: Used AsyncStorage for local data persistence with user-specific storage keys.

### 3. Form Validation
**Challenge**: Implementing robust form validation with good UX.
**Solution**: Created custom validation logic with real-time feedback and error display.

### 4. Navigation Flow
**Challenge**: Creating intuitive navigation between authenticated and public screens.
**Solution**: Used conditional rendering based on authentication state with proper stack and tab navigation.

### 5. Real-time Updates
**Challenge**: Ensuring UI updates immediately reflect data changes.
**Solution**: Implemented optimistic updates with proper error handling and rollback mechanisms.

## 🔄 Future Enhancements

- [ ] Push notifications for task reminders
- [ ] Task categories and tags
- [ ] Collaborative task sharing
- [ ] Dark mode support
- [ ] Offline functionality with sync
- [ ] Task analytics and reporting
- [ ] Calendar integration
- [ ] Voice-to-text task creation
- [ ] Photo attachments for tasks
- [ ] Recurring tasks

## 📚 Learning Outcomes

This project successfully demonstrates:
- Mobile app development with React Native and Expo
- Authentication and user management
- Complex state management with Context API
- Form handling and validation
- Local data persistence with AsyncStorage
- Responsive mobile UI design
- Navigation patterns in mobile apps
- CRUD operations and data management
- TypeScript integration in React Native

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Aline NIYONIZERA**
- GitHub: [@Aline-CROIRE](https://github.com/Aline-CROIRE)
- Email: niyocroirealine@gmail.com

---

*Built as part of the React Native Weekend Assignment - demonstrating practical mobile development skills and tutorial concepts implementation.*
