import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import {
  Box,
  Button,
  ButtonText,
  Heading,
  HStack,
  Input,
  InputField,
  Pressable,
  Spinner,
  Text,
  VStack,
} from '@gluestack-ui/themed';

import { useMemo, useState } from 'react';
import { Alert, Modal, useWindowDimensions } from 'react-native';

import { ProductCard } from '../../src/features/products/components/product-card';
import { useDeleteStoreMutation, useStoreByIdQuery } from '../../src/features/stores/store.queries';
import { EmptyState } from '../../src/shared/components/empty-state';
import { PageShell } from '../../src/shared/components/page-shell';
import { useDebouncedValue } from '../../src/shared/hooks/use-debounced-value';
import { formatCurrency } from '../../src/shared/utils/currency';
import { useUiStore } from '../../src/store/ui-store';

export default function StoreDetailScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const store = useStoreByIdQuery();
  const deleteStore = useDeleteStoreMutation();
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const productSearch = useUiStore((state) => state.productSearch);
  const setProductSearch = useUiStore((state) => state.setProductSearch);
  const debouncedProductSearch = useDebouncedValue(productSearch);
  const isTablet = width >= 900;

  const filteredProducts = useMemo(() => {
    const needle = debouncedProductSearch.trim().toLowerCase();

    if (!store.data) {
      return [];
    }

    return store.data.products.filter((product) =>
      [product.name, product.category]
        .join(' ')
        .toLowerCase()
        .includes(needle),
    );
  }, [debouncedProductSearch, store.data]);

  if (store.isLoading) {
    return (
      <PageShell>
        <Box alignItems="center" py="$16">
          <Spinner color="$orange600" size="large" />
        </Box>
      </PageShell>
    );
  }

  if (!store.data) {
    return (
      <PageShell>
        <EmptyState
          icon="package-variant-closed"
          title="Loja nao encontrada"
          description="O cadastro pode ter sido removido. Volte para a listagem para escolher outra loja."
          actionLabel="Voltar para lojas"
          onAction={() => router.replace('/stores')}
        />
      </PageShell>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      'Excluir loja',
      'Essa acao remove a loja e todos os produtos vinculados. Deseja continuar?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            await deleteStore.mutateAsync(store.data.id);
            router.replace('/stores');
          },
        },
      ],
    );
  };

  const handleStoreActions = () => {
    setIsActionsOpen(true);
  };

  return (
    <PageShell>
      <VStack space="md">
        <Box
          bg="#11203b"
          borderRadius="$3xl"
          overflow="hidden"
          px="$6"
          py="$7"
          position="relative"
        >
          <Box
            bg="#2563eb"
            borderRadius="$full"
            h={150}
            position="absolute"
            right={-36}
            top={-28}
            w={150}
          />
          <Box
            bg="#0891b2"
            borderRadius="$full"
            bottom={-72}
            h={150}
            position="absolute"
            right={56}
            w={150}
          />
          <VStack position="relative" space="md">
            <Text color="#93c5fd" fontSize="$sm" fontWeight="$bold">
              Unidade selecionada
            </Text>
            <Box pr={56}>
              <Text
                color="$white"
                fontSize={isTablet ? '$4xl' : '$2xl'}
                fontWeight="$bold"
                numberOfLines={2}
                textAlign="left"
              >
                {store.data.name}
              </Text>
            </Box>
            <Box position="absolute" right={0} top={0}>
              <Pressable onPress={handleStoreActions}>
                <Box
                  alignItems="center"
                  bg="#1d3458"
                  borderColor="#31517f"
                  borderRadius="$full"
                  borderWidth={1}
                  h="$10"
                  justifyContent="center"
                  w="$10"
                >
                  <MaterialCommunityIcons color="#f8fbff" name="dots-vertical" size={18} />
                </Box>
              </Pressable>
            </Box>
            <Text color="#dbeafe" fontSize="$md" maxWidth={isTablet ? '78%' : '100%'}>
              {store.data.address}
            </Text>
            <VStack space="sm" mt="$4">
              <Button
                alignItems="center"
                bg="#f76707"
                borderRadius="$full"
                h="$12"
                justifyContent="center"
                onPress={() =>
                  router.push({
                    pathname: '/products/form',
                    params: { storeId: store.data.id },
                  })
                }
                px="$5"
                width="100%"
              >
                <ButtonText fontSize="$md" fontWeight="$bold" textAlign="center" width="100%">
                  Novo produto
                </ButtonText>
              </Button>
              <HStack justifyContent="space-between" space="xs">
                <Box
                  bg="#162847"
                  borderColor="#31517f"
                  borderRadius="$2xl"
                  borderWidth={1}
                  flex={1}
                  px="$4"
                  py="$2.5"
                >
                  <Text color="#93c5fd" fontSize="$xs" fontWeight="$bold">
                    Produtos ativos
                  </Text>
                  <Text color="$white" fontSize="$2xl" fontWeight="$bold" mt="$1">
                    {store.data.productsCount}
                  </Text>
                </Box>
                <Box
                  bg="#162847"
                  borderColor="#31517f"
                  borderRadius="$2xl"
                  borderWidth={1}
                  flex={1}
                  px="$4"
                  py="$2.5"
                >
                  <Text color="#93c5fd" fontSize="$xs" fontWeight="$bold">
                    Valor em estoque
                  </Text>
                  <Text color="$white" fontSize="$2xl" fontWeight="$bold" mt="$1">
                    {formatCurrency(store.data.stockValue)}
                  </Text>
                </Box>
              </HStack>
            </VStack>
          </VStack>
        </Box>

          <VStack mt={2} space="xs">
        

          <Input
            alignItems="center"
            bg="#1d3458"
            borderColor="#31517f"
            borderRadius="$xl"
            borderWidth={1}
            flexDirection="row"
            h={56}
          >
            <Box alignItems="center" justifyContent="center" ml="$4" mr="$2">
              <MaterialCommunityIcons color="#93c5fd" name="magnify" size={18} />
            </Box>
            <InputField
              color="#eff6ff"
              flex={1}
              placeholder="Buscar produtos"
              placeholderTextColor="#9db4d4"
              value={productSearch}
              onChangeText={setProductSearch}
            />
          </Input>

          {filteredProducts.length ? (
            <VStack space="sm">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  storeId={store.data.id}
                />
              ))}
            </VStack>
          ) : (
            <EmptyState
              icon="package-variant-closed"
              title="Nenhum produto encontrado"
              description="Cadastre itens para essa loja ou revise o termo de busca aplicado."
              actionLabel="Adicionar produto"
              variant="dark"
              onAction={() =>
                router.push({
                  pathname: '/products/form',
                  params: { storeId: store.data.id },
                })
              }
            />
          )}
        </VStack>
      </VStack>

      <Modal
        animationType="fade"
        transparent
        visible={isActionsOpen}
        onRequestClose={() => setIsActionsOpen(false)}
      >
        <Pressable
          alignItems="center"
          bg="rgba(3, 10, 24, 0.58)"
          flex={1}
          justifyContent="flex-end"
          onPress={() => setIsActionsOpen(false)}
          px="$4"
          py="$6"
        >
          <Pressable onPress={() => {}} width="100%">
            <Box
              bg="#11203b"
              borderColor="#28456f"
              borderRadius="$3xl"
              borderWidth={1}
              p="$5"
              width="100%"
            >
              <VStack space="md">
                <VStack space="xs">
                  <Text color="#93c5fd" fontSize="$sm" fontWeight="$bold">
                    Acoes da loja
                  </Text>
                  <Heading color="$white" size="lg">
                    {store.data.name}
                  </Heading>
                </VStack>

                <Button
                  alignItems="flex-start"
                  bg="#1d3458"
                  borderRadius="$2xl"
                  h="$12"
                  justifyContent="center"
                  onPress={() => {
                    setIsActionsOpen(false);
                    router.push({
                      pathname: '/stores/form',
                      params: { storeId: store.data.id },
                    });
                  }}
                  px="$5"
                >
                  <ButtonText color="#eff6ff" fontWeight="$bold">
                    Editar loja
                  </ButtonText>
                </Button>

                <Button
                  alignItems="flex-start"
                  bg="#3b0d13"
                  borderRadius="$2xl"
                  h="$12"
                  justifyContent="center"
                  onPress={() => {
                    setIsActionsOpen(false);
                    handleDelete();
                  }}
                  px="$5"
                >
                  <ButtonText color="#fecaca" fontWeight="$bold">
                    Excluir loja
                  </ButtonText>
                </Button>

                <HStack justifyContent="flex-end" pt="$2">
                  <Pressable onPress={() => setIsActionsOpen(false)}>
                    <Text color="#c7d7ef" fontWeight="$bold">
                      Fechar
                    </Text>
                  </Pressable>
                </HStack>
              </VStack>
            </Box>
          </Pressable>
        </Pressable>
      </Modal>
    </PageShell>
  );
}
