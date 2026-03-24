import { create } from 'zustand';

type UiState = {
  productSearch: string;
  setProductSearch: (value: string) => void;
  setStoresSearch: (value: string) => void;
  storesSearch: string;
};

export const useUiStore = create<UiState>((set) => ({
  productSearch: '',
  setProductSearch: (value) => set({ productSearch: value }),
  setStoresSearch: (value) => set({ storesSearch: value }),
  storesSearch: '',
}));
