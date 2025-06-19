import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'white' | 'green';
  text?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  color = 'blue',
  text 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const colorClasses = {
    blue: 'border-blue-600',
    white: 'border-white',
    green: 'border-green-600'
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className={`
        ${sizeClasses[size]} 
        border-2 
        border-gray-200 
        ${colorClasses[color]} 
        border-t-transparent 
        rounded-full 
        animate-spin
      `} />
      {text && (
        <p className="text-sm text-gray-600 animate-pulse">{text}</p>
      )}
    </div>
  );
}; 