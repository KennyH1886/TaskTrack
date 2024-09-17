import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Animated, useColorScheme } from 'react-native';

interface Task {
  key: string;
  text: string;
}

export default function ToDoList() {
  const systemColorScheme = useColorScheme(); // Automatically detect system theme.
  const [theme, setTheme] = useState<'light' | 'dark'>(systemColorScheme || 'light'); // Use system theme initially

  const [task, setTask] = useState<string>(''); // Task input state
  const [tasks, setTasks] = useState<Task[]>([]); // List of tasks

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { key: Date.now().toString(), text: task }]);
      setTask('');
    }
  };

  const removeTask = (taskKey: string) => {
    setTasks(tasks.filter((task) => task.key !== taskKey));
  };

  // Determine which styles to use based on the current theme
  const styles = theme === 'dark' ? darkStyles : lightStyles;

  return (
    <View style={styles.container}>
      {/* Welcome Message */}
      <Text style={styles.welcome}>Welcome to Task Track!</Text>

      {/* Theme Toggle Button */}
      <TouchableOpacity
        style={styles.toggleButton}
        onPress={() => setTheme(theme === 'light' ? 'dark' : 'light')} // Toggle between light and dark
      >
        <Text style={styles.toggleButtonText}>
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </Text>
      </TouchableOpacity>

      {/* To-Do List Title */}
      <Text style={styles.title}>To-Do List</Text>

      {/* Add Task Input */}
      <TextInput
        style={styles.input}
        placeholder="Add a new task"
        placeholderTextColor={theme === 'dark' ? '#888' : '#555'} // Dynamic placeholder color
        value={task}
        onChangeText={setTask}
      />
      <TouchableOpacity style={styles.buttonContainer} onPress={addTask}>
        <Text style={styles.buttonText}>Add Task</Text>
      </TouchableOpacity>

      {/* List of Tasks */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.key} // Specify key extractor for FlatList
        renderItem={({ item }) => (
          <FadeInTask>
            <Text style={styles.task}>{item.text}</Text>
            <TouchableOpacity onPress={() => removeTask(item.key)}>
              <Text style={styles.deleteButton}>Complete</Text>
            </TouchableOpacity>
          </FadeInTask>
        )}
      />
    </View>
  );
}

// Fade-in Animation Component
interface FadeInTaskProps {
  children: ReactNode; // Type for children prop
}

const FadeInTask: React.FC<FadeInTaskProps> = ({ children }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500, // Duration of the fade-in effect
      useNativeDriver: true, // Use native driver for better performance
    }).start();
  }, [fadeAnim]);

  return <Animated.View style={{ opacity: fadeAnim }}>{children}</Animated.View>;
};

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF', // Light background
  },
  welcome: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333', // Dark gray text in light mode
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333', // Dark gray text for title in light mode
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#DDD',
    marginBottom: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    backgroundColor: '#FFFFFF', // Light background for input
    color: '#000000', // Black text in light mode
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3, // For Android shadow
  },
  buttonContainer: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: '600',
    fontSize: 18,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4, // For Android shadow
  },
  task: {
    fontSize: 18,
    color: '#333', // Dark gray text in light mode
  },
  deleteButton: {
    color: '#FF5252',
    fontWeight: '600',
    fontSize: 16,
  },
  toggleButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  toggleButtonText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212', // Dark background
  },
  welcome: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#FFFFFF', // White text for welcome message in dark mode
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10,
    color: '#FFFFFF', // White text for title in dark mode
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#444',
    marginBottom: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 18,
    backgroundColor: '#1E1E1E', // Dark background for input
    color: '#FFFFFF', // White text in dark mode
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonContainer: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: '600',
    fontSize: 18,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  task: {
    fontSize: 18,
    color: '#FFFFFF', // White text in dark mode
  },
  deleteButton: {
    color: '#FF5252',
    fontWeight: '600',
    fontSize: 16,
  },
  toggleButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  toggleButtonText: {
    textAlign: 'center',
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
