import { useState, useEffect } from 'react';
import React from 'react';
import BreathingWidget from './components/BreathingWidget';
import './breathing-widget.css';
import Timer from './components/Timer';


function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  // Load tasks from localStorage on initial load
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    const savedCompletedTasks = JSON.parse(localStorage.getItem('completedTasks'));

    console.log('Loaded from localStorage:', savedTasks, savedCompletedTasks);

    if (savedTasks && savedTasks.length > 0) setTasks(savedTasks);
    if (savedCompletedTasks && savedCompletedTasks.length > 0) setCompletedTasks(savedCompletedTasks);
  }, []);

  // Handle new task input
  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  // Add a new task when pressing Enter
  const handleAddTask = (e) => {
    if (e.key === 'Enter' && task.trim() !== '') {
      setTasks([...tasks, task]);
      setTask('');
    }
  };

  // Mark task as completed and trigger animation
  const handleCompleteTask = (completedTask) => {
    setTasks(tasks.filter((task) => task !== completedTask));
    setCompletedTasks([...completedTasks, completedTask]);
  };

  // Save tasks and completedTasks to localStorage whenever they change
  useEffect(() => {
    if (tasks.length > 0 || completedTasks.length > 0) {
      console.log('Saving to localStorage:', tasks, completedTasks);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    }
  }, [tasks, completedTasks]);

  return (
    <div className="app">
      <div className="completed-tasks">
        <h3>wins</h3>
        <ul>
          {completedTasks.map((task, index) => (
            <li key={index} className="completed">
              {task}
            </li>
          ))}
        </ul>
      </div>

      <div className="input-container">
      <BreathingWidget />
        <div className="input-section">
          <input
            type="text"
            value={task}
            onChange={handleInputChange}
            onKeyDown={handleAddTask}
            placeholder="Type your task and press ENTER"
          />
        </div>

        <div className="task-section">
          <ul>
            {tasks.map((task, index) => (
              <li key={index}>
                {task}
                <button
                  onClick={() => handleCompleteTask(task)}
                  className="task-button"
                >
                  <i className="fa fa-circle"></i> {/* Empty circle */}
                  <i className="fa fa-check-circle"></i> {/* Checkmark (hidden by default) */}
                </button>
              </li>
            ))}
          </ul>
        </div>


        <Timer />

      </div>
    </div>
  );
}

export default App;
