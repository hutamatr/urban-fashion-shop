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
  // postalCode: z
  //   .string({
  //     required_error: 'Postal Code is required',
  //     invalid_type_error: 'Postal Code is required',
  //   })
  //   .min(4, {
  //     message: 'Postal Code must have at least 4 characters',
  //   }),
  // city: z
  //   .string({
  //     required_error: 'City is required',
  //     invalid_type_error: 'City is required',
  //   })
  //   .min(4, {
  //     message: 'City must have at least 4 characters',
  //   }),
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

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string({
        required_error: 'Old password is required',
        invalid_type_error: 'Old password must be a string',
      })
      .trim()
      .min(8, 'Old password must be at least 8 characters long')
      .max(32, 'Old password must be less than 32 characters'),
    newPassword: z
      .string({
        required_error: 'New password is required',
        invalid_type_error: 'New password must be a string',
      })
      .trim()
      .min(8, { message: 'New password must be at least 8 characters long' })
      .max(32, { message: 'New password must be less than 32 characters' })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&_])[A-Za-z\d$@$!%*?&_]{8,32}$/,
        {
          message:
            'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
        }
      ),
    confirmNewPassword: z
      .string()
      .trim()
      .min(8, 'Confirm password must be at least 8 characters long')
      .max(32, 'Confirm password must be less than 32 characters'),
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    path: ['newPassword'],
    message: 'Password same as old password',
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ['confirmNewPassword'],
    message: 'Password do not match',
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
