import React, { useState, useCallback, useMemo } from 'react';
import TaskInput from './components/TaskInput';
import SubtaskInput from './components/SubtaskInput';

function App() {
  const [tasks, setTasks] = useState([]);
  const [anxietyLevel, setAnxietyLevel] = useState("low");

  // Memoized function to add a new task
  const addTask = useCallback((newTaskTitle) => {
    const newTask = {
      id: Date.now(), // Assign a unique ID to each task
      title: newTaskTitle,
      subtasks: [],
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  }, []);

  // Memoized function to add a new subtask to a task
  const addSubtask = useCallback((taskIndex, subtaskText) => {
    const newTasks = [...tasks];
    const newSubtask = { id: Date.now(), text: subtaskText, completed: false };
    newTasks[taskIndex].subtasks.push(newSubtask);
    setTasks(newTasks);
  }, [tasks]);

  // Memoized function to toggle subtask completion
  const toggleSubtask = useCallback((taskIndex, subtaskIndex) => {
    const updatedTasks = [...tasks];
    const currentStatus = updatedTasks[taskIndex].subtasks[subtaskIndex].completed;
    updatedTasks[taskIndex].subtasks[subtaskIndex].completed = !currentStatus;
    setTasks(updatedTasks);
  }, [tasks]);

  // Memoized function to delete a task
  const deleteTask = useCallback((taskIndex) => {
    const newTasks = tasks.filter((_, index) => index !== taskIndex);
    setTasks(newTasks);
  }, [tasks]);

  // Memoized function to delete a subtask
  const deleteSubtask = useCallback((taskIndex, subtaskIndex) => {
    const newTasks = [...tasks];
    newTasks[taskIndex].subtasks = newTasks[taskIndex].subtasks.filter(
      (_, index) => index !== subtaskIndex
    );
    setTasks(newTasks);
  }, [tasks]);

  // Random motivational quotes
  const positiveQuotes = [
    "My Guy!",
    "Splendiferous!",
    "Sweet!",
    "That's Progress!",
    "More! MORE!",
    "Wowzers!",
    "Fantastico!"
  ];

  const getRandomQuote = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * positiveQuotes.length);
    return positiveQuotes[randomIndex];
  }, []);

  // Memoize progress calculation
  const progress = useMemo(() => {
    const totalSubtasks = tasks.reduce((total, task) => total + task.subtasks.length, 0);
    const completedSubtasks = tasks.reduce(
      (total, task) => total + task.subtasks.filter(subtask => subtask.completed).length,
      0
    );
    return totalSubtasks === 0 ? 0 : (completedSubtasks / totalSubtasks) * 100;
  }, [tasks]);

  return (
    <div className="container">
      <h1>Easy Wins</h1>
      <TaskInput addTask={addTask} />

      <div>
        {/* Anxiety Level UI */}
        <h4>How intimidating is this task?</h4>
        <div>
          <button
            className={anxietyLevel === "low" ? "selected" : ""}
            onClick={() => setAnxietyLevel("low")}
          >
            Low
          </button>
          <button
            className={anxietyLevel === "medium" ? "selected" : ""}
            onClick={() => setAnxietyLevel("medium")}
          >
            Medium
          </button>
          <button
            className={anxietyLevel === "high" ? "selected" : ""}
            onClick={() => setAnxietyLevel("high")}
          >
            High
          </button>
        </div>
      </div>

      <div>
        <ul>
          {tasks.map((task, taskIndex) => (
            <li key={task.id} className="task-item">
              <div className="task-header">
                <div className="task-title">{task.title}</div>
                <SubtaskInput addSubtask={(subtask) => addSubtask(taskIndex, subtask)} />
                <button onClick={() => deleteTask(taskIndex)} className="task-action-btn">
                  Delete
                </button>
              </div>

              <ul className="subtasks-list">
                {task.subtasks.map((subtask, subtaskIndex) => (
                  <li key={subtask.id} className="subtask-item">
                    <input
                      type="checkbox"
                      checked={subtask.completed}
                      onChange={() => toggleSubtask(taskIndex, subtaskIndex)}
                      className="subtask-checkbox"
                      aria-checked={subtask.completed ? "true" : "false"}
                    />
                    <span
                      className={`subtask-text ${subtask.completed ? 'completed' : ''}`}
                    >
                      {subtask.text}
                    </span>
                    <button
                      onClick={() => deleteSubtask(taskIndex, subtaskIndex)}
                      className="task-action-btn"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

        <div className="smiley-container">
          {tasks.flatMap(task => task.subtasks)
            .filter(subtask => subtask.completed)
            .map((_, index) => (
              <span key={index} role="img" aria-label="smiley">
                😊
              </span>
            ))}
        </div>
        <h3>{getRandomQuote()}</h3>
    </div>
  );
}

export default App;
