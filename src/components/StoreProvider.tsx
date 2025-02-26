import { type FC, type ReactNode, useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { setTheme } from '../store/slices/themeSlice';

type Props = {
  children: ReactNode;
};

const StoreProvider: FC<Props> = ({ children }) => {
  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark';
    store.dispatch(setTheme(isDark));
  }, []);

  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
