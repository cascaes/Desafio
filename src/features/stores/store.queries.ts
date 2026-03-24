import { useLocalSearchParams } from 'expo-router';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { inventoryRepository } from '../inventory/repository.factory';
import type { StoreInput } from './store.schemas';

export function useStoresQuery(search = '') {
  return useQuery({
    queryFn: () => inventoryRepository.stores.list(search),
    queryKey: ['stores', search],
  });
}

export function useStoreByIdQuery(explicitStoreId?: string) {
  const params = useLocalSearchParams<{ storeId?: string }>();
  const storeId = explicitStoreId ?? params.storeId;

  return useQuery({
    enabled: Boolean(storeId),
    queryFn: () => inventoryRepository.stores.getById(storeId as string),
    queryKey: ['store', storeId],
  });
}

export function useCreateStoreMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: StoreInput) => inventoryRepository.stores.create(input),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['stores'] });
    },
  });
}

export function useUpdateStoreMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: StoreInput }) =>
      inventoryRepository.stores.update(id, input),
    onSuccess: (store) => {
      void queryClient.invalidateQueries({ queryKey: ['stores'] });
      void queryClient.invalidateQueries({ queryKey: ['store', store.id] });
    },
  });
}

export function useDeleteStoreMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (storeId: string) => inventoryRepository.stores.delete(storeId),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['stores'] });
    },
  });
}
