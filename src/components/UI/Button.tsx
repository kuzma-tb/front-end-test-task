import { type FC, type ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  className?: string;
  children: ReactNode;
}

const Button: FC<ButtonProps> = ({
  children,
  isLoading,
  className = '',
  ...restProps
}) => {
  let cssClasses =
    'w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';
  cssClasses += ' ' + className;

  return (
    <button
      {...restProps}
      disabled={restProps.disabled || isLoading}
      className={cssClasses}
    >
      {isLoading && <span className="loader mr-2"></span>}
      {isLoading ? 'Submitting...' : children}
    </button>
  );
};

export default Button;
