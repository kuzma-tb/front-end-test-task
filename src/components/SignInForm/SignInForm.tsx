import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import useAuth from '../../hooks/useAuth';
import { useAppSelector } from '../../store/hooks';
import { RootState } from '../../store/store';
import { FormFields } from '../../types/input.types';
import { signInSchema } from '../../utils/validationSchema';

import Button from '../UI/Button';
import Input from '../UI/Input';

const SignInForm = () => {
  const error = useAppSelector((state: RootState) => state.auth.error);
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: yupResolver(signInSchema),
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const onSubmitForm = async (data: FormFields) => {
    const result = await login(data);
    if (result.success) reset();
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white shadow-md rounded-xl p-8">
      <h1 className="text-2xl font-bold dark:text-white text-gray-800 text-center mb-6">
        Sign In
      </h1>

      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className="mb-4">
          <Input
            label="Email address"
            type="email"
            id="email"
            className="dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white"
            {...register('email')}
            error={errors.email?.message}
            disabled={isSubmitting}
          />
        </div>
        <div className="mb-4">
          <Input
            label="Password"
            type="password"
            id="password"
            className="dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white"
            {...register('password')}
            error={errors.password?.message}
            disabled={isSubmitting}
          />
        </div>
        <Button
          type="submit"
          className="bg-blue-500 dark:bg-blue-700 text-white"
          isLoading={isSubmitting}
        >
          Sign in
        </Button>
      </form>
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default SignInForm;
