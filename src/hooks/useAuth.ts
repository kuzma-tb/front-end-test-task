import { useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from '../store/slices/authSlice';
import { FormFields } from '../types/input.types';

interface UseAuth {
  login: (data: FormFields) => Promise<{ success: boolean; message?: string }>;
  loading: boolean;
}

const useAuth = (): UseAuth => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const login = async ({ email, password }: FormFields) => {
    setLoading(true);
    dispatch(loginStart());

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (email === 'test@test.test' && password === 'password') {
        dispatch(
          loginSuccess({
            email,
            name: email.split('@')[0],
            id: crypto.randomUUID(),
            role: 'user',
          })
        );

        return { success: true };
      } else {
        dispatch(loginFailure('User not found'));

        return { success: false };
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unexpected error occurred';
      dispatch(loginFailure(errorMessage));

      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};

export default useAuth;
