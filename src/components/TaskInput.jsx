import React, { useState } from 'react';

function TaskInput({ addTask }) {
  const [taskTitle, setTaskTitle] = useState('');

  const handleTaskTitleChange = (e) => {
    setTaskTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskTitle.trim()) {
      // Capitalize only when submitting
      const formattedTitle = taskTitle.charAt(0).toUpperCase() + taskTitle.slice(1);
      addTask(formattedTitle);
      setTaskTitle('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskTitle}
        onChange={handleTaskTitleChange}
        placeholder="Enter task"
        aria-label="Task input"
      />
      <button type="submit" className="task-action-btn" disabled={!taskTitle.trim()}>
        <i className="fa-solid fa-plus"></i> {/* Font Awesome plus icon */}
      </button>
    </form>
  );
}

export default TaskInput;
