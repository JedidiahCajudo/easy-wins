import React, { useState } from 'react';

function TaskInput({ addTask }) {
  const [taskTitle, setTaskTitle] = useState('');

  const handleInputChange = (e) => {
    // Capitalize the first letter and keep the rest of the string the same
    const formattedTitle = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
    setTaskTitle(formattedTitle);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskTitle.trim()) {
      addTask(taskTitle);
      setTaskTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskTitle}
        onChange={handleInputChange}
        placeholder="Enter task"
      />
      <button type="submit" className="task-action-btn">
        <i className="fa-solid fa-plus"></i> {/* Font Awesome plus icon */}
      </button>
    </form>
  );

}

export default TaskInput;
