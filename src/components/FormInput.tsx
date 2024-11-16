import React from 'react';
import { cn } from '../utils/cn';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function FormInput({ 
  label, 
  error, 
  className,
  required,
  ...props 
}: FormInputProps) {
  return (
    <div className="space-y-2">
      <label className="flex text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <input
        className={cn(
          "w-full px-4 py-2 rounded-lg border transition-colors duration-200",
          "bg-white dark:bg-gray-900",
          "border-gray-300 dark:border-gray-700",
          "focus:border-primary-500 dark:focus:border-primary-500",
          "focus:ring-2 focus:ring-primary-500/20",
          "placeholder:text-gray-400 dark:placeholder:text-gray-600",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
          className
        )}
        {...props}
      />
      
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}