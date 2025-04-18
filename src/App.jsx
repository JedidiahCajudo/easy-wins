import React, { useState, useCallback, useMemo } from 'react';
import TaskInput from './components/TaskInput';
import SubtaskInput from './components/SubtaskInput';

const positiveQuotes = [
  "My Guy!", "Splendiferous!", "Sweet!", "That's Progress!", "More! MORE!", "Wowzers!", "Fantastico!"
];

function App() {
  const [tasks, setTasks] = useState([]);
  const [anxietyLevel, setAnxietyLevel] = useState("low");

  // Add a new task
  const addTask = useCallback((newTaskTitle) => {
    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      anxietyLevel,
      subtasks: [],
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  }, [anxietyLevel]);

  // Add a new subtask to a task
  const addSubtask = useCallback((taskIndex, subtaskText) => {
    const updatedTasks = [...tasks];
    const newSubtask = { id: Date.now(), text: subtaskText, completed: false };
    updatedTasks[taskIndex].subtasks.push(newSubtask);
    setTasks(updatedTasks);
  }, [tasks]);

  // Toggle subtask completion
  const toggleSubtask = useCallback((taskIndex, subtaskIndex) => {
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex].subtasks[subtaskIndex].completed = !updatedTasks[taskIndex].subtasks[subtaskIndex].completed;
    setTasks(updatedTasks);
  }, [tasks]);

  // Delete a task
  const deleteTask = useCallback((taskIndex) => {
    setTasks(tasks.filter((_, index) => index !== taskIndex));
  }, [tasks]);

  // Delete a subtask
  const deleteSubtask = useCallback((taskIndex, subtaskIndex) => {
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex].subtasks = updatedTasks[taskIndex].subtasks.filter((_, index) => index !== subtaskIndex);
    setTasks(updatedTasks);
  }, [tasks]);

  // Random positive feedback
  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * positiveQuotes.length);
    return positiveQuotes[randomIndex];
  };

  // Calculate progress percentage
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

      {/* Task Input Section */}
      <h4>Add a task</h4>
      <TaskInput addTask={addTask} />

      {/* Anxiety Level Section */}
      <h4>How overwhelming is this task?</h4>
      <select
        value={anxietyLevel}
        onChange={(e) => setAnxietyLevel(e.target.value)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      {/* Task List Section */}
      <div className="task-list">
        <ul>
          {tasks.map((task, taskIndex) => (
            <li key={task.id} className="task-item">
              <div className="task-header">
                <div className="task-title">
                  {task.title}
                  <span className={`anxiety-level ${task.anxietyLevel}`}>
                    ({task.anxietyLevel.charAt(0).toUpperCase() + task.anxietyLevel.slice(1)})
                  </span>
                </div>

                {/* Render SubtaskInput once for each task */}
                <SubtaskInput addSubtask={(subtask) => addSubtask(taskIndex, subtask)} />
                <button
                  onClick={() => deleteTask(taskIndex)}
                  className="task-action-btn"
                  aria-label="Delete task"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>

              {/* Subtask List Section */}
              <ul className="subtasks-list">
                {task.subtasks.map((subtask, subtaskIndex) => (
                  <li key={subtask.id} className="subtask-item">
                    <input
                      type="checkbox"
                      checked={subtask.completed}
                      onChange={() => toggleSubtask(taskIndex, subtaskIndex)}
                      className="subtask-checkbox"
                      aria-label={`Mark ${subtask.text} as completed`}
                    />
                    <span className={`subtask-text ${subtask.completed ? 'completed' : ''}`}>
                      {subtask.text}
                    </span>
                    <button
                      onClick={() => deleteSubtask(taskIndex, subtaskIndex)}
                      className="task-action-btn"
                      aria-label={`Delete subtask ${subtask.text}`}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      {/* Smileys for Completed Subtasks */}
      <div className="smiley-container">
        {tasks.flatMap(task => task.subtasks)
          .filter(subtask => subtask.completed)
          .map((_, index) => (
            <span key={index} role="img" aria-label="smiley">
              😊
            </span>
          ))}
      </div>

      {/* Positive Feedback for Completed Subtasks */}
      {tasks.some(task => task.subtasks.some(subtask => subtask.completed)) && (
        <h3>{getRandomQuote()}</h3>
      )}
    </div>
  );
}

export default App;
