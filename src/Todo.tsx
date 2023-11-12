// Todo.tsx
import React, { useState, useEffect } from 'react';
import './App.css'; // Import your custom CSS file

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const Todo: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
  const [taskText, setTaskText] = useState<string>('');
  const [uncheckedCount, setUncheckedCount] = useState<number>(0);
  const [checkedCount, setCheckedCount] = useState<number>(0);

  useEffect(() => {
    // Update counts whenever tasks change
    const unchecked = tasks.filter((task) => !task.completed).length;
    const checked = tasks.filter((task) => task.completed).length;
    setUncheckedCount(unchecked);
    setCheckedCount(checked);
  }, [tasks]);

  const addTask = () => {
    if (taskText.trim() === '') return;
    const newTask: Task = {
      id: tasks.length + 1,
      text: taskText,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTaskText('');
  };

  const deleteTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const toggleTaskCompletion = (id: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteAllTasks = () => {
    setTasks([]);
  };

  const deleteCompletedTasks = () => {
    const incompleteTasks = tasks.filter((task) => !task.completed);
    setTasks(incompleteTasks);
  };

  const checkAllTasks = () => {
    const updatedTasks = tasks.map((task) => ({ ...task, completed: true }));
    setTasks(updatedTasks);
  };

  const uncheckAllTasks = () => {
    const updatedTasks = tasks.map((task) => ({ ...task, completed: false }));
    setTasks(updatedTasks);
  };
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // Add or remove 'dark-mode' class based on darkMode state
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <h1 className={darkMode ? 'dark-mode' : ''}>Todo App</h1>
      <div>
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Enter a task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div>
        <h2>Tasks</h2>
        <p>
          Unchecked: {uncheckedCount} | Checked: {checkedCount} | Total: {tasks.length}
        </p>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <label>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                />
                <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                  {task.text}
                </span>
              </label>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
        <div>
          <button onClick={deleteAllTasks}>Delete All</button>
          <button onClick={deleteCompletedTasks}>Delete Completed</button>
          <button onClick={checkAllTasks}>Check All</button>
          <button onClick={uncheckAllTasks}>Uncheck All</button>
        </div>
        <button onClick={() => setDarkMode(!darkMode)} className={darkMode ? 'dark-mode' : ''}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </div>
  );
};

export default Todo;
