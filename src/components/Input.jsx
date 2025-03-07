import React from 'react';

const Input = ({
  type = 'text',
  name,
  value,
  onChange,
  placeholder = '',
  errors,
  className = '',
  label = '',
  ...rest
},ref) => {
  return (
    <div className="mb-4">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`block w-full px-3 py-2 border ${
          errors?.[name] ? 'border-red-500' : 'border-gray-300'
        } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${className}`}
        ref={ref}
        {...rest}
      />
      {errors?.[name] && (
        <p className="mt-1 text-sm text-red-500">{errors[name].message}</p>
      )}
    </div>
  );
};

export default Input;