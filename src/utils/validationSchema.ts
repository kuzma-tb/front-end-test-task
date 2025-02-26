import * as yup from 'yup';

export const signInSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup.string().min(8).max(32).required('Password is required'),
});
