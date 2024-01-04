import { z } from 'zod';

export const signUpSchema = z
  .object({
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

export const userDetailSchema = z.object({
  firstName: z.string().min(4, 'First name is required'),
  lastName: z.string().min(4, 'Last name is required'),
  email: z.string().email('Invalid email').min(1, 'Email is required'),
  address: z.string().max(300, 'Address is required'),
});

export const changePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(8, 'Old password must be at least 8 characters long')
    .max(32, 'Old password must be less than 32 characters'),
  newPassword: z
    .string()
    .min(8, 'New password must be at least 8 characters long')
    .max(32, 'New password must be less than 32 characters'),
  confirmNewPassword: z
    .string()
    .min(8, 'Confirm password must be at least 8 characters long')
    .max(32, 'Confirm password must be less than 32 characters'),
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email').min(1, 'Email is required'),
});

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(32, 'Password must be less than 32 characters'),
  confirmPassword: z
    .string()
    .min(8, 'Confirm password must be at least 8 characters long')
    .max(32, 'Confirm password must be less than 32 characters'),
});
