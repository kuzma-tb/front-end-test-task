import { type ReactNode } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import HomePage from './pages/home';
import StoreProvider from './components/StoreProvider';
import UIProvider from './components/UIProvider';
import SignInPage from './pages/signIn';

const App = () => {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <PageWrapper>
                <HomePage />
              </PageWrapper>
            }
          />
          <Route
            path="/sign-in"
            element={
              <PageWrapper>
                <SignInPage />
              </PageWrapper>
            }
          />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
};

const PageWrapper = ({ children }: { children: ReactNode }) => {
  return <UIProvider>{children}</UIProvider>;
};

export default App;
