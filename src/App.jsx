// App.jsx
import React, { useState, useCallback, useMemo } from 'react';
import TaskInput from './components/TaskInput';
import SubtaskInput from './components/SubtaskInput';

function App() {
  const [tasks, setTasks] = useState([]);
  const [anxietyLevel, setAnxietyLevel] = useState("low");
  const [hasCompletedSubtask, setHasCompletedSubtask] = useState(false);

  const addTask = useCallback((newTaskTitle) => {
    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      anxietyLevel,
      subtasks: [],
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  }, [anxietyLevel]);

  const addSubtask = useCallback((taskIndex, subtaskText) => {
    const newTasks = [...tasks];
    const newSubtask = { id: Date.now(), text: subtaskText, completed: false };
    newTasks[taskIndex].subtasks.push(newSubtask);
    setTasks(newTasks);
  }, [tasks]);

  const toggleSubtask = useCallback((taskIndex, subtaskIndex) => {
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex].subtasks[subtaskIndex].completed = !updatedTasks[taskIndex].subtasks[subtaskIndex].completed;
    setTasks(updatedTasks);
  }, [tasks]);

  const deleteTask = useCallback((taskIndex) => {
    setTasks(tasks.filter((_, index) => index !== taskIndex));
  }, [tasks]);

  const deleteSubtask = useCallback((taskIndex, subtaskIndex) => {
    const newTasks = [...tasks];
    newTasks[taskIndex].subtasks = newTasks[taskIndex].subtasks.filter((_, index) => index !== subtaskIndex);
    setTasks(newTasks);
  }, [tasks]);

  const positiveQuotes = [
    "My Guy!", "Splendiferous!", "Sweet!", "That's Progress!", "More! MORE!", "Wowzers!", "Fantastico!"
  ];

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * positiveQuotes.length);
    return positiveQuotes[randomIndex];
  };

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
      <h4>How intimidating is this task? (use keys ⬅️ or ➡️)</h4>
      <div>
        {['low', 'medium', 'high'].map(level => (
          <button
            key={level}
            className={anxietyLevel === level ? "selected" : ""}
            onClick={() => setAnxietyLevel(level)}
          >
            {level.charAt(0).toUpperCase() + level.slice(1)}
          </button>
        ))}
      </div>

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
                <SubtaskInput addSubtask={(subtask) => addSubtask(taskIndex, subtask)} />
                {/* Delete Task Button */}
                <button onClick={() => deleteTask(taskIndex)} className="task-action-btn">
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
                    />
                    <span className={`subtask-text ${subtask.completed ? 'completed' : ''}`}>
                      {subtask.text}
                    </span>
                    {/* Delete Subtask Button */}
                    <button
                      onClick={() => deleteSubtask(taskIndex, subtaskIndex)}
                      className="task-action-btn"
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
