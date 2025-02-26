import { FC, ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router';
import { useAppSelector } from '../store/hooks';
import { selectTheme } from '../store/slices/themeSlice';

import 'preline/preline';
import { IStaticMethods } from 'preline/preline';
import Navbar from './Navbar';

declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

type Props = {
  children: ReactNode;
};

const UIProvider: FC<Props> = ({ children }) => {
  const location = useLocation();
  const isDark = useAppSelector(selectTheme);

  useEffect(() => {
    window.HSStaticMethods.autoInit();
    document.documentElement.classList.toggle('dark', isDark);
  }, [location.pathname, isDark]);

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
      <Navbar />
      {children}
    </div>
  );
};

export default UIProvider;
