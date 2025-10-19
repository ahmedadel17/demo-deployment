'use client'
import React, { useState } from 'react';

interface DeleteButtonProps {
  onDelete: () => Promise<void> | void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'icon' | 'text' | 'button';
  children?: React.ReactNode;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  onDelete,
  className = '',
  size = 'md',
  variant = 'icon',
  children
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Delete button clicked, setting loading to true');
    setIsDeleting(true);
    try {
      await onDelete();
      console.log('Delete operation completed');
    } catch (error) {
      console.error('Failed to delete item:', error);
    } finally {
      console.log('Setting loading to false');
      setIsDeleting(false);
    }
  };

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const baseClasses = 'text-gray-400 hover:text-red-500 transition-colors';
  const disabledClasses = isDeleting ? 'opacity-50 cursor-not-allowed' : '';

  const combinedClassName = `${baseClasses} ${disabledClasses} ${className}`.trim();

  const getButtonContent = () => {
    if (isDeleting) {
      console.log('Showing spinner, isDeleting:', isDeleting);
      return (
        <div className={`animate-spin rounded-full border-2 border-red-200 border-t-red-500 ${sizeClasses[size]}`}></div>
      );
    }

    if (variant === 'text' && children) {
      return children;
    }

    if (variant === 'button' && children) {
      return children;
    }

    // Default icon variant
    return (
      <svg className={sizeClasses[size]} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    );
  };

  if (variant === 'button') {
    return (
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className={`px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-md transition-colors ${disabledClasses} ${className}`}
        aria-label="Delete item"
      >
        {getButtonContent()}
      </button>
    );
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className={combinedClassName}
      aria-label="Delete item"
    >
      {getButtonContent()}
    </button>
  );
};

export default DeleteButton;
