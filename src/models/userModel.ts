import { z } from 'zod';

export const schemaUser = z
  .object({
    username: z.string().min(3, 'El nombre el obligarotio'),
    password: z.string().min(6, 'La contraseña es obligatoria'),
    confirmPassword: z.string().min(6, 'La confirmacion es obligatoria'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

export type UserFormValues = z.infer<typeof schemaUser>;

// For edit
export const schemaUserEdit = z
  .object({
    username: z.string().min(3, 'El nombre es obligatorio'),
    password: z
      .string()
      .min(6, 'La contraseña debe tener mínimo 6 caracteres')
      .optional(),
    confirmPassword: z
      .string()
      .min(6, 'La confirmación debe tener mínimo 6 caracteres')
      .optional(),
  })
  .refine(
    (data) => {
      if (data.password || data.confirmPassword) {
        return data.password === data.confirmPassword;
      }
      return true; // if no password, ok
    },
    {
      message: 'Las contraseñas no coinciden',
      path: ['confirmPassword'],
    },
  );
