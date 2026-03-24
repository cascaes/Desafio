import { useLocalSearchParams } from 'expo-router';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { inventoryRepository } from '../inventory/repository.factory';
import { useStoreByIdQuery } from '../stores/store.queries';
import type { ProductInput } from './product.schemas';

export function useProductByIdQuery(explicitProductId?: string) {
  const params = useLocalSearchParams<{ productId?: string; storeId?: string }>();
  const productId = explicitProductId ?? params.productId;
  const storeQuery = useStoreByIdQuery(params.storeId);

  return useQuery({
    enabled: Boolean(productId && storeQuery.data),
    queryFn: async () =>
      storeQuery.data?.products.find((product) => product.id === productId),
    queryKey: ['product', productId, storeQuery.data?.id],
  });
}

export function useCreateProductMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: ProductInput) => inventoryRepository.products.create(input),
    onSuccess: (product) => {
      void queryClient.invalidateQueries({ queryKey: ['stores'] });
      void queryClient.invalidateQueries({ queryKey: ['store', product.storeId] });
    },
  });
}

export function useUpdateProductMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: ProductInput }) =>
      inventoryRepository.products.update(id, input),
    onSuccess: (product) => {
      void queryClient.invalidateQueries({ queryKey: ['stores'] });
      void queryClient.invalidateQueries({ queryKey: ['store', product.storeId] });
      void queryClient.invalidateQueries({ queryKey: ['product', product.id] });
    },
  });
}

export function useDeleteProductMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: { productId: string; storeId: string }) =>
      inventoryRepository.products.delete(input.productId),
    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({ queryKey: ['stores'] });
      void queryClient.invalidateQueries({ queryKey: ['store', variables.storeId] });
    },
  });
}
