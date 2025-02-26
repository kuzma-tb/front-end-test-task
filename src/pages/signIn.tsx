import { type FC, useEffect } from 'react';
import { useNavigate } from 'react-router';

import { useAppSelector } from '../store/hooks';
import { RootState } from '../store/store';
import AuthLayout from '../components/SignInForm/AuthLayout';
import SignInForm from '../components/SignInForm/SignInForm';

const SignInPage: FC = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  return (
    <AuthLayout>
      <SignInForm />
    </AuthLayout>
  );
};

export default SignInPage;
