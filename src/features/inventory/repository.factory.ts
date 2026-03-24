import { ProductsRepository } from '../products/product.repository';
import { StoresRepository } from '../stores/store.repository';

export function createInventoryRepository() {
  return {
    products: new ProductsRepository(),
    stores: new StoresRepository(),
  };
}

export const inventoryRepository = createInventoryRepository();
