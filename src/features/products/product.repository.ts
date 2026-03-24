import { apiClient } from '../../shared/api/api-client';
import { toProduct } from './product.adapters';
import type { ProductInput } from './product.schemas';

type ProductDto = Parameters<typeof toProduct>[0];

export class ProductsRepository {
  async create(input: ProductInput) {
    const response = await apiClient<ProductDto>('/products', {
      body: input,
      method: 'POST',
    });

    return toProduct(response);
  }

  async update(productId: string, input: ProductInput) {
    const response = await apiClient<ProductDto>(`/products/${productId}`, {
      body: input,
      method: 'PUT',
    });

    return toProduct(response);
  }

  async delete(productId: string) {
    await apiClient<void>(`/products/${productId}`, { method: 'DELETE' });
  }
}
