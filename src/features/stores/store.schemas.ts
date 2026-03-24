import { z } from 'zod';

export const storeSchema = z.object({
  address: z.string(),
  createdAt: z.string(),
  id: z.string(),
  name: z.string(),
  productsCount: z.number(),
  stockValue: z.number(),
  updatedAt: z.string(),
});

export const storeInputSchema = z.object({
  address: z.string().min(5, 'Informe um endereco valido.'),
  name: z.string().min(3, 'Informe um nome com pelo menos 3 caracteres.'),
});

export type Store = z.infer<typeof storeSchema>;
export type StoreInput = z.input<typeof storeInputSchema>;
export type StoreWithProducts = Store & {
  products: import('../products/product.schemas').Product[];
};
