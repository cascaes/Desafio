import { describe, expect, it } from '@jest/globals';

import { formatCurrency } from '../src/shared/utils/currency';

describe('formatCurrency', () => {
  it('formats numbers in pt-BR currency', () => {
    expect(formatCurrency(149.9)).toBe('R$\u00a0149,90');
  });
});
