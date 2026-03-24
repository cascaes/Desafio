import { describe, expect, it } from '@jest/globals';

import { toStore } from '../src/features/stores/store.adapters';

describe('toStore', () => {
  it('keeps store payload unchanged for the domain layer', () => {
    const store = toStore({
      address: 'Rua da Paz, 10',
      createdAt: '2026-03-23T00:00:00.000Z',
      id: 'store-1',
      name: 'Loja Teste',
      productsCount: 3,
      stockValue: 450.75,
      updatedAt: '2026-03-23T00:00:00.000Z',
    });

    expect(store.name).toBe('Loja Teste');
    expect(store.productsCount).toBe(3);
    expect(store.stockValue).toBe(450.75);
  });
});
