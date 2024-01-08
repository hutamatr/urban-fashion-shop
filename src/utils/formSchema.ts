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
  firstName: z
    .string({
      required_error: 'First name is required',
      invalid_type_error: 'First name is required',
    })
    .min(4, {
      message: 'First name must have at least 4 characters',
    }),
  lastName: z
    .string({
      required_error: 'Last name is required',
      invalid_type_error: 'Last name is required',
    })
    .min(4, {
      message: 'Last name must have at least 4 characters',
    }),
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email({
      message: 'Email must be a valid email',
    }),
  postalCode: z
    .string({
      required_error: 'Postal Code is required',
      invalid_type_error: 'Postal Code is required',
    })
    .min(4, {
      message: 'Postal Code must have at least 4 characters',
    }),
  city: z
    .string({
      required_error: 'City is required',
      invalid_type_error: 'City is required',
    })
    .min(4, {
      message: 'City must have at least 4 characters',
    }),
  address: z
    .string({
      required_error: 'Address is required',
      invalid_type_error: 'Address is required',
    })
    .min(4, {
      message: 'Please enter a valid address',
    })
    .max(500, {
      message: 'Address must be less than 500 characters',
    }),
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
