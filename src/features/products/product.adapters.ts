import type { Product } from './product.schemas';

type ProductDto = {
  category: string;
  createdAt: string;
  id: string;
  name: string;
  price: number;
  storeId: string;
  updatedAt: string;
};

export function toProduct(dto: ProductDto): Product {
  return dto;
}
