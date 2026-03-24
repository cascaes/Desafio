import { toProduct } from '../products/product.adapters';
import { apiClient } from '../../shared/api/api-client';
import { toStore, toStoreWithProducts } from './store.adapters';
import type { StoreInput } from './store.schemas';

type StoreDto = Parameters<typeof toStore>[0];
type StoreWithProductsDto = StoreDto & {
  products: Parameters<typeof toProduct>[0][];
};

export class StoresRepository {
  async list(search = '') {
    const query = search ? `?q=${encodeURIComponent(search)}` : '';
    const response = await apiClient<StoreDto[]>(`/stores${query}`);

    return response.map(toStore);
  }

  async getById(storeId: string) {
    const response = await apiClient<StoreWithProductsDto>(`/stores/${storeId}`);

    return toStoreWithProducts(response, response.products.map(toProduct));
  }

  async create(input: StoreInput) {
    const response = await apiClient<StoreDto>('/stores', {
      body: input,
      method: 'POST',
    });

    return toStore(response);
  }

  async update(storeId: string, input: StoreInput) {
    const response = await apiClient<StoreDto>(`/stores/${storeId}`, {
      body: input,
      method: 'PUT',
    });

    return toStore(response);
  }

  async delete(storeId: string) {
    await apiClient<void>(`/stores/${storeId}`, { method: 'DELETE' });
  }
}
