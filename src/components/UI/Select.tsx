import { type FC, SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  labelClassName?: string;
  selectClassName?: string;
}

const Select: FC<SelectProps> = ({
  label,
  error,
  options,
  labelClassName = '',
  selectClassName = '',
  ...restProps
}) => {
  let labelClasses = 'block mb-2 text-sm font-medium';
  let selectClasses = `py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm ${
    error ? 'border-red-500' : 'focus:border-blue-500 focus:ring-blue-500'
  }`;

  labelClasses += ' ' + labelClassName;
  selectClasses += ' ' + selectClassName;

  return (
    <>
      {label && (
        <label
          htmlFor={restProps.id || 'select'}
          className={labelClasses}
        >
          {label}
        </label>
      )}
      <select
        {...restProps}
        aria-describedby={error ? 'error' : undefined}
        aria-invalid={!!error}
        className={selectClasses}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1.5">{error}</p>}
    </>
  );
};

export default Select;



