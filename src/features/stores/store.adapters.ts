import type { Product } from '../products/product.schemas';
import type { Store, StoreWithProducts } from './store.schemas';

type StoreDto = {
  address: string;
  createdAt: string;
  id: string;
  name: string;
  productsCount: number;
  stockValue: number;
  updatedAt: string;
};

export function toStore(dto: StoreDto): Store {
  return dto;
}

export function toStoreWithProducts(dto: StoreDto, products: Product[]): StoreWithProducts {
  return {
    ...dto,
    products,
  };
}
