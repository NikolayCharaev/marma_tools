import React, { FC } from 'react';

type IButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

const CustomButton: FC<IButtonProps> = ({ children, onClick, className }) => {
  return (
    <button
      className={`text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-red-100
        font-medium rounded-lg text-sm px-5  py-2.5 xs:px-3 mt:text-xs text-center mt:px-1  mr-2 mb-2 ${className}`}
      onClick={onClick}>
      {children}
    </button>
  );
};

export default CustomButton;
