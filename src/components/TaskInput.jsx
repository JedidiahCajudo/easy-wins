import React, { useState, useRef } from 'react';
import SubtaskInput from '.SubtaskInput';

function TaskInput({ addTask }) {
  const [taskTitle, setTaskTitle] = useState('');
  const subtaskInputRef = useRef(null);

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

      subtaskInputRef.current.focus();
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

      <SubtaskInput ref={subtaskInputRef} addSubtask={(subtask) => console.log(subtask)} />
    </form>
  );
};

export default TaskInput;
