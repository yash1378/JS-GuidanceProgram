import React, { useState, useEffect } from 'react';

const Toast = ({ message, onClose ,bgColor }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const toastStyle = {
    // color: textColor || 'white', // Set text color or default to white
    backgroundColor: bgColor || 'transparent', // Set background color or default to green
  };


  return (
    <div className="relative">
      {/* Your other content */}
      
      {visible && (
        <div
          id="toast-bottom-right"
          className="fixed flex items-center w-full max-w-xs p-4 space-x-4 text-[white]  divide-x divide-gray-200 rounded-lg shadow right-5 bottom-5 dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800"
          role="alert"
          style={toastStyle} 
        >
          <div className="text-sm font-normal">{message}</div>
        </div>
      )}
    </div>
  );
};

export default Toast;
