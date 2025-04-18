import React, { useState, forwardRef } from 'react';

const SubtaskInput = forwardRef(({ addSubtask }, ref) => {
  const [subtask, setSubtask] = useState('');

  const handleInputChange = (event) => {
    setSubtask(event.target.value);  // Update the subtask as the user types
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && subtask.trim()) {
      addSubtask(subtask);  // Add subtask if Enter is pressed
      setSubtask('');  // Clear input after submission
    }
  };

  return (
    <input
      type="text"
      ref={ref}
      value={subtask}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}  // Trigger adding subtask on Enter key press
      placeholder="write subtask then press Enter"
    />
  );
});

export default SubtaskInput;
