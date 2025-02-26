import { memo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { selectTheme, toggleTheme } from '../store/slices/themeSlice';
import { useAppSelector } from '../store/hooks';

const ThemeToggleButton = memo(() => {
  const dispatch = useDispatch();

  const isDark = useAppSelector(selectTheme);

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="p-2 cursor-pointer border rounded-md bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
    >
      {isDark ? 'Light' : 'Dark'} Theme
    </button>
  );
});

export default ThemeToggleButton;
