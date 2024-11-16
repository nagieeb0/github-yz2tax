import React from 'react';
import Select, { Props as SelectProps } from 'react-select';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';

interface FormSelectProps extends Omit<SelectProps, 'theme'> {
  label: string;
  error?: string;
  required?: boolean;
}

export default function FormSelect({ 
  label, 
  error, 
  required,
  className,
  ...props 
}: FormSelectProps) {
  const { theme } = useTheme();

  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      backgroundColor: theme === 'dark' ? 'rgb(17 24 39)' : 'white',
      borderColor: error ? 'rgb(239 68 68)' : state.isFocused ? 'rgb(99 102 241)' : 'rgb(209 213 219)',
      boxShadow: state.isFocused ? '0 0 0 2px rgba(99, 102, 241, 0.2)' : 'none',
      '&:hover': {
        borderColor: error ? 'rgb(239 68 68)' : 'rgb(99 102 241)',
      },
    }),
    menu: (base: any) => ({
      ...base,
      backgroundColor: theme === 'dark' ? 'rgb(31 41 55)' : 'white',
      border: `1px solid ${theme === 'dark' ? 'rgb(55 65 81)' : 'rgb(229 231 235)'}`,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    }),
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected
        ? theme === 'dark'
          ? 'rgb(79 70 229)'
          : 'rgb(99 102 241)'
        : state.isFocused
        ? theme === 'dark'
          ? 'rgba(79, 70, 229, 0.1)'
          : 'rgba(99, 102, 241, 0.1)'
        : 'transparent',
      color: state.isSelected
        ? 'white'
        : theme === 'dark'
        ? 'rgb(229 231 235)'
        : 'rgb(17 24 39)',
      '&:active': {
        backgroundColor: state.isSelected
          ? theme === 'dark'
            ? 'rgb(67 56 202)'
            : 'rgb(79 70 229)'
          : undefined,
      },
    }),
    multiValue: (base: any) => ({
      ...base,
      backgroundColor: theme === 'dark' ? 'rgb(55 65 81)' : 'rgb(243 244 246)',
    }),
    multiValueLabel: (base: any) => ({
      ...base,
      color: theme === 'dark' ? 'rgb(229 231 235)' : 'rgb(17 24 39)',
    }),
    multiValueRemove: (base: any) => ({
      ...base,
      color: theme === 'dark' ? 'rgb(156 163 175)' : 'rgb(107 114 128)',
      '&:hover': {
        backgroundColor: theme === 'dark' ? 'rgb(75 85 99)' : 'rgb(229 231 235)',
        color: theme === 'dark' ? 'white' : 'rgb(31 41 55)',
      },
    }),
  };

  return (
    <div className={cn("space-y-2", className)}>
      <label className="flex text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <Select
        {...props}
        styles={customStyles}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: 'rgb(99 102 241)',
            primary75: 'rgb(129 140 248)',
            primary50: 'rgb(165 180 252)',
            primary25: 'rgb(199 210 254)',
          },
        })}
        className="react-select-container"
        classNamePrefix="react-select"
      />
      
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}