import { z } from 'zod';

export const productSchema = z.object({
  category: z.string(),
  createdAt: z.string(),
  id: z.string(),
  name: z.string(),
  price: z.number(),
  storeId: z.string(),
  updatedAt: z.string(),
});

export const productInputSchema = z.object({
  category: z.string().min(2, 'Informe a categoria do produto.'),
  name: z.string().min(3, 'Informe um nome de produto valido.'),
  price: z
    .string()
    .min(1, 'Informe o preco do produto.')
    .refine((value) => Number(value) > 0, 'O preco deve ser maior que zero.'),
  storeId: z.string().min(1, 'Informe a loja relacionada.'),
});

export type Product = z.infer<typeof productSchema>;
export type ProductInput = z.input<typeof productInputSchema>;
