import { useState } from 'react';
import TaskInput from './components/TaskInput';
import SubtaskInput from './components/SubtaskInput';

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTaskTitle) => {
    const newTask = {
      title: newTaskTitle,
      subtasks: [],
    };
    setTasks([...tasks, newTask]);
  };

  const addSubtask = (taskIndex, subtaskText) => {
    const newTasks = [...tasks];
    const newSubtask = { text: subtaskText, completed: false };
    newTasks[taskIndex].subtasks.push(newSubtask);
    setTasks(newTasks);
  };

  const toggleSubtask = (taskIndex, subtaskIndex) => {
    const updatedTasks = [...tasks];
    const currentStatus = updatedTasks[taskIndex].subtasks[subtaskIndex].completed;
    updatedTasks[taskIndex].subtasks[subtaskIndex].completed = !currentStatus;
    setTasks(updatedTasks);
  };

  const deleteTask = (taskIndex) => {
    const newTasks = tasks.filter((_, index) => index !== taskIndex);
    setTasks(newTasks);
  };

  const deleteSubtask = (taskIndex, subtaskIndex) => {
    const newTasks = [...tasks];
    newTasks[taskIndex].subtasks = newTasks[taskIndex].subtasks.filter(
      (_, index) => index !== subtaskIndex
    );
    setTasks(newTasks);
  };

  const positiveQuotes = [
    "Another drop in the bucket!",
    "Another step up the mountain",
    "You're farther than you think!",
    "That's progress!",
    "Yes! Keep adding tasks!",
    "More tasks! More more more!",
  ];

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * positiveQuotes.length);
    return positiveQuotes[randomIndex];
  };

  // Calculate the total progress of all subtasks across all tasks
  const totalSubtasks = tasks.reduce((total, task) => total + task.subtasks.length, 0);
  const completedSubtasks = tasks.reduce(
    (total, task) => total + task.subtasks.filter(subtask => subtask.completed).length,
    0
  );

  const progress = totalSubtasks === 0 ? 0 : (completedSubtasks / totalSubtasks) * 100;

  return (
    <>
      <h1>Easy Wins</h1>
      <TaskInput addTask={addTask} />

      {/* Display the combined momentum board */}
      <div>
        <h3>Your Tasks:</h3>
        <ul>
          {tasks.map((task, taskIndex) => (
            <li key={taskIndex} className="task-item">
              <div className="task-header">
                <div className="task-title">{task.title}</div>
                <SubtaskInput addSubtask={(subtask) => addSubtask(taskIndex, subtask)} />
                <button onClick={() => deleteTask(taskIndex)} className="delete-task-btn">
                  Delete Task
                </button>
              </div>

              <ul className="subtasks-list">
                {task.subtasks.map((subtask, subtaskIndex) => (
                  <li key={subtaskIndex} className="subtask-item">
                    <input
                      type="checkbox"
                      checked={subtask.completed}
                      onChange={() => toggleSubtask(taskIndex, subtaskIndex)}
                      className="subtask-checkbox"
                    />
                    <span
                      className={`subtask-text ${subtask.completed ? 'completed' : ''}`}
                    >
                      {subtask.text}
                    </span>
                    <button
                      onClick={() => deleteSubtask(taskIndex, subtaskIndex)}
                      className="delete-subtask-btn"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        <div className="momentum-board">
          <h3>Momentum Board</h3>
          {/* Display one smiley face per completed subtask */}
          <div className="smiley-container">
            {tasks.flatMap(task => task.subtasks)
              .filter(subtask => subtask.completed)
              .map((_, index) => (
                <span key={index} role="img" aria-label="smiley">
                  😊
                </span>
              ))}
          </div>
          <p>{getRandomQuote()}</p>
        </div>
        </ul>
      </div>
    </>
  );
};

export default App;
