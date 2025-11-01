'use client'
import React from 'react';
import { Field, ErrorMessage } from 'formik';

interface TextAreaProps {
  name: string;
  id?: string;
  label?: string;
  placeholder?: string;
  rows?: number;
  className?: string;
  required?: boolean;
  disabled?: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({
  name,
  id,
  label,
  placeholder = "Enter your comment here...",
  rows = 3,
  className = "",
  required = false,
  disabled = false
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label 
          htmlFor={id || name} 
          className="block text-sm font-medium text-gray-900 dark:text-white mt-4"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <Field 
        as="textarea" 
        id={id || name}
        name={name}
        rows={rows}
        disabled={disabled}
        className={`w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-primary-500 focus:border-primary-500 ${className}`}
        placeholder={placeholder}
      />
      <ErrorMessage name={name} component="div" className="text-red-600 text-sm mt-1" />
    </div>
  );
};

export default TextArea;
