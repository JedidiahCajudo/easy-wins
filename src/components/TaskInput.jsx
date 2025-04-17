import { useState } from 'react';

const TaskInput = ({ addTask }) => {
  const [taskTitle, setTaskTitle] = useState('');

  const handleTaskTitleChange = (event) => {
    setTaskTitle(event.target.value);  // Update task title as user types
  };

  const handleKeyPress = (event) => {
    // Listen for the "Enter" key (keyCode 13 or event.key === "Enter")
    if (event.key === 'Enter' && taskTitle.trim()) {
      addTask(taskTitle);  // Add the task
      setTaskTitle('');  // Clear the input field after submission
    }
  };

  return (
    <div>
      <input
        type="text"
        value={taskTitle}
        onChange={handleTaskTitleChange}
        onKeyPress={handleKeyPress}  // Trigger adding task on Enter press
        placeholder="Enter your task"
      />
    </div>
  );
};

export default TaskInput;
