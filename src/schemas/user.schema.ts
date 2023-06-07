import { z } from "zod";

export const userSchema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  username: z.string().nonempty("Username é obrigatório"),
  email: z.string().email("Deve ser um e-mail válido"),
  password: z.string().nonempty("Senha é obrigatória"),
  companyName: z.string().nonempty("Nome da empresa é obrigatório"),
  avatar: z.string().optional()
});

export const loginSchema = userSchema.omit({
  name: true,
  username: true,
  companyName: true,
  avatar: true
});

export type UserData = z.infer<typeof userSchema>;
export type LoginData = z.infer<typeof loginSchema>;
