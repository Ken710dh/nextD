import React from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

type InputFieldProps = {
  label: string;
  placeholder?: string;
  type?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  id?: string;
  disabled?: boolean;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  placeholder,
  type = 'text',
  register,
  error,
  id,
  disabled = false,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id || register.name} className="font-medium text-sm">
        {label}
      </label>
      <input
        {...register}
        id={id || register.name}
        type ={type}
        placeholder={placeholder}
        disabled={disabled}
        className={`p-2 rounded border border-gray-300 focus:outline-none focus:border-gray-500 hover:border-gray-700 transition-colors duration-200 shadow-sm text-[14px] ${
          error ? 'border-red-500' : ''
        }`}
      />
      {error && <small className="text-red-500 text-sm">{error.message}</small>}
    </div>
  );
};

export default InputField;
