import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

interface Task {
  key: string;
  text: string;
}

export default function ToDoList() {
  const [task, setTask] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { key: Date.now().toString(), text: task }]);
      setTask('');
    }
  };

  const removeTask = (taskKey: string) => {
    setTasks(tasks.filter((task) => task.key !== taskKey));
  };

  return (
    <View style={styles.container}>
      {/* Welcome Message */}
      <Text style={styles.welcome}>Welcome to the To-Do List App!</Text>

      {/* To-Do List App Title */}
      <Text style={styles.title}>To-Do List</Text>
      
      {/* Add Task Input */}
      <TextInput
        style={styles.input}
        placeholder="Add a new task"
        value={task}
        onChangeText={setTask}
      />
      <Button title="Add Task" onPress={addTask} />

      {/* List of Tasks */}
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.task}>{item.text}</Text>
            <TouchableOpacity onPress={() => removeTask(item.key)}>
              <Text style={styles.deleteButton}>Complete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
    padding: 10,
    fontSize: 18,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  task: {
    fontSize: 18,
  },
  deleteButton: {
    color: 'red',
  },
});
