// import z from 'zod';
//
// export const schemaUser = z.object({
//   username: z.string().min(3, 'El nombre de usuario es obligatorio'),
//   password: z.string().min(6, 'La contraseña debe tener mínimo 6 caracteres'),
// });
//
// export type UserFormValues = z.infer<typeof schemaUser>;

import { z } from 'zod';

export const schemaUserEdit = z
  .object({
    username: z.string().min(3, 'El nombre de usuario es obligatorio'),
    password: z
      .string()
      .min(6, 'La contraseña debe tener mínimo 6 caracteres')
      .optional()
      .or(z.literal('')),
    confirmPassword: z.string().optional().or(z.literal('')),
  })
  .refine(
    (data) => {
      if (data.password || data.confirmPassword) {
        return data.password === data.confirmPassword;
      }
      return true; // si ambos están vacíos, no valida la igualdad
    },
    {
      message: 'Las contraseñas no coinciden',
      path: ['confirmPassword'],
    },
  );
