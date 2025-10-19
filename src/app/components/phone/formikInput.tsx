'use client'
import React from 'react';
import { Field, ErrorMessage } from 'formik';

interface FormikInputProps {
  name: string;
  type?: string;
  label?: string;
  placeholder?: string;
  autoComplete?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  id?: string;
}

const FormikInput: React.FC<FormikInputProps> = ({
  name,
  type = 'text',
  label,
  placeholder,
  autoComplete,
  className = '',
  required = false,
  disabled = false,
  id
}) => {
  const inputId = id || name;
  const baseClasses = `w-full border rounded px-3 py-2 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 `;
  const combinedClassName = `${baseClasses} ${className}`.trim();

  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <Field
        type={type}
        id={inputId}
        name={name}
        className={combinedClassName}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
      />
      <ErrorMessage name={name} component="div" className="text-red-600 text-sm mt-1" />
    </div>
  );
};

export default FormikInput;
