import { z } from 'zod';

export const signUpSchema = z
  .object({
    username: z.string().min(1, 'Username is required').max(100),
    email: z.string().email('Invalid email').min(1, 'Email is required'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must have more than 8 characters'),
    confirmPassword: z.string().min(1, 'Password confirmation is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

export const signInSchema = z.object({
  email: z.string().email('Invalid email').min(1, 'Email is required'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must have more than 8 characters'),
});
