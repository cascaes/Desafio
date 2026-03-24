import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import {
  Box,
  Button,
  ButtonText,
  HStack,
  Text,
  VStack,
} from '@gluestack-ui/themed';

import { Alert } from 'react-native';

import { formatCurrency } from '../../../shared/utils/currency';
import { useDeleteProductMutation } from '../product.queries';
import type { Product } from '../product.schemas';

type ProductCardProps = {
  product: Product;
  storeId: string;
};

export function ProductCard({ product, storeId }: ProductCardProps) {
  const router = useRouter();
  const deleteProduct = useDeleteProductMutation();

  const handleDelete = () => {
    Alert.alert('Excluir produto', 'Deseja remover este item do estoque?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          await deleteProduct.mutateAsync({ productId: product.id, storeId });
        },
      },
    ]);
  };

  return (
    <Box
      bg="#11203b"
      borderColor="#2b4b76"
      borderRadius="$2xl"
      borderWidth={1}
      overflow="hidden"
    >
      <VStack p="$5" space="md">
        <Text
          color="#f8fbff"
          fontSize="$xl"
          fontWeight="$bold"
          numberOfLines={2}
          textAlign="left"
        >
          {product.name}
        </Text>

        <Box
          bg="#162847"
          borderColor="#31517f"
          borderRadius="$2xl"
          borderWidth={1}
          mt="$4"
          px="$4"
          py="$4"
        >
          <HStack alignItems="center" mb="$2" space="sm">
            <MaterialCommunityIcons color="#93c5fd" name="tag-outline" size={16} />
            <Text color="#93c5fd" fontSize="$sm" fontWeight="$bold">
              Categoria
            </Text>
          </HStack>
          <Text color="#dbeafe" fontSize="$md">
            {product.category}
          </Text>
        </Box>

        <Box
          bg="#162847"
          borderColor="#31517f"
          borderRadius="$xl"
          borderWidth={1}
          mt="$2"
          px="$4"
          py="$3"
        >
          <HStack alignItems="center" justifyContent="space-between" space="md">
            <VStack space="xs">
              <Text color="#93c5fd" fontSize="$xs" fontWeight="$bold">
                Valor do produto
              </Text>
              <Text color="#f8fbff" fontSize="$xl" fontWeight="$bold">
                {formatCurrency(product.price)}
              </Text>
            </VStack>

            <HStack space="sm">
              <Button
                alignItems="center"
                variant="outline"
                borderColor="#60a5fa"
                borderRadius="$full"
                flexDirection="row"
                justifyContent="center"
                onPress={() =>
                  router.push({
                    pathname: '/products/form',
                    params: { productId: product.id, storeId },
                  })
                }
              >
                <MaterialCommunityIcons
                  color="#93c5fd"
                  name="pencil-outline"
                  size={16}
                />
                <ButtonText color="#dbeafe" ml="$2" textAlign="center">
                  Editar
                </ButtonText>
              </Button>
              <Button
                alignItems="center"
                variant="outline"
                borderColor="#ef4444"
                borderRadius="$full"
                flexDirection="row"
                justifyContent="center"
                onPress={handleDelete}
              >
                <MaterialCommunityIcons
                  color="#f87171"
                  name="trash-can-outline"
                  size={16}
                />
                <ButtonText color="#fecaca" ml="$2" textAlign="center">
                  Excluir
                </ButtonText>
              </Button>
            </HStack>
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
}
