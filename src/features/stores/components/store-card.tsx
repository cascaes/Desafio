import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { Box, HStack, Pressable, Text, VStack } from '@gluestack-ui/themed';
import { useWindowDimensions } from 'react-native';

import type { Store } from '../store.schemas';
import { formatCurrency } from '../../../shared/utils/currency';

type StoreCardProps = {
  store: Store;
};

export function StoreCard({ store }: StoreCardProps) {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isCompact = width < 768;
  const badgeLabel = `${store.productsCount} ${
    store.productsCount === 1 ? 'produto' : 'produtos'
  }`;

  return (
    <Pressable onPress={() => router.push(`/stores/${store.id}`)} width="100%">
      <Box
        bg="#11203b"
        borderColor="#2b4b76"
        borderRadius="$2xl"
        borderWidth={1}
        overflow="hidden"
        width="100%"
      >
        <VStack p="$5" space="md">
          <HStack alignItems="center" flexDirection="row" justifyContent="space-between" space="md">
            <Box flex={1} pr="$3">
              <Text
                color="#f8fbff"
                fontSize="$xl"
                fontWeight="$bold"
                textAlign="left"
              >
                {store.name}
              </Text>
            </Box>
            <Box
              alignItems="center"
              bg="#1d3458"
              borderRadius="$full"
              borderWidth={1}
              borderColor="#31517f"
              flexShrink={0}
              h="$10"
              justifyContent="center"
              w="$10"
            >
              <MaterialCommunityIcons
                color="#f8fbff"
                name="chevron-right"
                size={20}
              />
            </Box>
          </HStack>

          <Box
            bg="#162847"
            borderColor="#31517f"
            borderRadius="$2xl"
            borderWidth={1}
            px="$4"
            py="$4"
          >
            <HStack alignItems="center" mb="$2" space="sm">
              <MaterialCommunityIcons
                color="#93c5fd"
                name="map-marker-outline"
                size={16}
              />
              <Text color="#93c5fd" fontSize="$sm" fontWeight="$bold">
                Endereco da filial
              </Text>
            </HStack>
            <Text color="#dbeafe" fontSize="$md" lineHeight="$lg">
              {store.address}
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
            <HStack
              alignItems={isCompact ? 'flex-start' : 'center'}
              flexDirection={isCompact ? 'column' : 'row'}
              justifyContent="space-between"
              space="md"
            >
              <VStack space="xs">
                <Text color="#93c5fd" fontSize="$xs" fontWeight="$bold">
                  Produtos cadastrados
                </Text>
                <Text color="#f8fbff" fontWeight="$bold">
                  {badgeLabel}
                </Text>
              </VStack>

              <VStack alignItems={isCompact ? 'flex-start' : 'flex-end'} space="xs">
                <Text color="#93c5fd" fontSize="$xs" fontWeight="$bold">
                  Valor em estoque
                </Text>
                <Text color="#f8fbff" fontSize="$xl" fontWeight="$bold">
                  {formatCurrency(store.stockValue)}
                </Text>
              </VStack>
            </HStack>
          </Box>
        </VStack>
      </Box>
    </Pressable>
  );
}
