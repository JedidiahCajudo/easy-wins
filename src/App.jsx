import { useState } from 'react';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  // Handle new task input
  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  // Add a new task when pressing Enter
  const handleAddTask = (e) => {
    if (e.key === 'Enter' && task.trim() !== '') {
      setTasks([...tasks, task]);
      setTask('');  // Reset input field
    }
  };

  // Mark task as completed and add a class for strikethrough
  const handleCompleteTask = (completedTask) => {
    setTasks(tasks.filter((task) => task !== completedTask)); // Remove from tasks
    setCompletedTasks([...completedTasks, completedTask]); // Add to completed tasks
  };

  return (
    <div className="app">
      <div className="completed-tasks">
        <h3>Completed Tasks</h3>
        <ul>
          {completedTasks.map((task, index) => (
            <li key={index} className="completed">{task}</li>
          ))}
        </ul>
      </div>

      <div className="input-container">
        <div className="input-section">
          <input
            type="text"
            value={task}
            onChange={handleInputChange}
            onKeyDown={handleAddTask}
            placeholder="Type a task and press ENTER"
          />
        </div>

        <div className="task-section">
          <ul>
            {tasks.map((task, index) => (
              <li key={index}>
                {task}
                <button onClick={() => handleCompleteTask(task)}>DONE</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
