import { type FC, ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
};

export default AuthLayout;
