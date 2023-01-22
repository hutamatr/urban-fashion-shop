import React from 'react';

export const Button = ({
  children,
  className,
  type,
  onClick,
  onDoubleClick,
  onMouseEnter,
  onMouseLeave,
  disabled,
}) => {
  return (
    <button
      className={className}
      type={type}
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
