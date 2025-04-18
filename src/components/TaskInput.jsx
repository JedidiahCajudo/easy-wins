import React, { useState } from 'react';

const TaskInput = ({ addTask }) => {
  const [task, setTask] = useState('');

  const handleInputChange = (event) => {
    setTask(event.target.value);  // Update task as user types
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && task.trim()) {
      addTask(task);  // Add the task when Enter is pressed
      setTask('');  // Clear input after task submission
    }
  };

  return (
    <input
      type="text"
      value={task}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}  // Trigger adding task on Enter key press
      placeholder="Write task then press Enter"
    />
  );
};

export default TaskInput;
