import { type FC, InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  labelClassName?: string;
  inputClassName?: string;
}

const Input: FC<InputProps> = ({
  label,
  error,
  labelClassName = '',
  inputClassName = '',
  ...restProps
}) => {
  let labelClasses = 'block mb-2 text-sm font-medium';
  let inputClasses = `py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm ${
    error ? 'border-red-500' : 'focus:border-blue-500 focus:ring-blue-500'
  }`;

  labelClasses += ' ' + labelClassName;
  inputClasses += ' ' + inputClassName;

  return (
    <>
      {label && (
        <label
          htmlFor={restProps.id || 'input'}
          className={labelClasses}
        >
          {label}
        </label>
      )}
      <input
        {...restProps}
        aria-describedby={error ? 'error' : undefined}
        aria-invalid={!!error}
        className={inputClasses}
      />
      {error && <p className="text-red-500 text-sm mt-1.5">{error}</p>}
    </>
  );
};

export default Input;
