import React, { useEffect, useState } from 'react';

interface IProps {
  message: string;
}

const Alert = ({ message }: IProps) => {
  const [isVisible, setVisibility] = useState(false);

  useEffect(() => {
    setVisibility(message.length > 0);
    if (message.length > 0) {
      setTimeout(() => {
        setVisibility(false);
      }, 5000);
    }
  }, [message, isVisible]);

  if (!isVisible) {
    return <div />;
  }

  return (
    <div className="fixed bottom-0 right-0 w-5/6 md:w-full max-w-sm z-50">
      <input type="checkbox" className="hidden" id="closeAlert" />
      <label
        className=" m-10 close cursor-pointer flex items-start justify-between w-full p-2 bg-info h-24 rounded shadow-lg text-default"
        title="close"
        htmlFor="closeAlert"
      >
        {message}
        <svg
          className="fill-current text-white"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 18 18"
        >
          <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
        </svg>
      </label>
    </div>
  );
};

export default Alert;
