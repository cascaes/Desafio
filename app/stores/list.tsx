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
  Spinner,
  Text,
  VStack,
} from '@gluestack-ui/themed';

import { useWindowDimensions } from 'react-native';

import { StoreCard } from '../../src/features/stores/components/store-card';
import { useStoresQuery } from '../../src/features/stores/store.queries';
import { EmptyState } from '../../src/shared/components/empty-state';
import { PageShell } from '../../src/shared/components/page-shell';
import { useDebouncedValue } from '../../src/shared/hooks/use-debounced-value';
import { useUiStore } from '../../src/store/ui-store';

export default function StoresListScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const storesSearch = useUiStore((state) => state.storesSearch);
  const setStoresSearch = useUiStore((state) => state.setStoresSearch);
  const debouncedSearch = useDebouncedValue(storesSearch);
  const { data: stores = [], isLoading } = useStoresQuery(debouncedSearch);
  const isTablet = width >= 768;

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
          <VStack space="md">
            <Text color="#93c5fd" fontSize="$sm" fontWeight="$bold">
              Gestao de filiais
            </Text>
            <Heading color="$white" size={isTablet ? '3xl' : '2xl'}>
              Lojas cadastradas
            </Heading>
            <Text color="#dbeafe" fontSize="$md" maxWidth={isTablet ? '78%' : '100%'}>
              Busque por nome ou endereco para filtrar resultados e adicione
              novas unidades pelo mesmo fluxo.
            </Text>
            <Button
              alignItems="center"
              bg="#f76707"
              borderRadius="$full"
              h="$12"
              justifyContent="center"
              mt="$4"
              onPress={() => router.push('/stores/form')}
              px="$5"
              width="100%"
            >
              <ButtonText fontSize="$md" fontWeight="$bold" textAlign="center" width="100%">
                Nova loja
              </ButtonText>
            </Button>
          </VStack>
        </Box>

        <VStack mt={2} space="md">
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
              fontSize="$md"
              placeholder="Buscar lojas ou enderecos"
              placeholderTextColor="#9db4d4"
              value={storesSearch}
              onChangeText={setStoresSearch}
            />
          </Input>

          {isLoading ? (
            <Box alignItems="center" py="$16">
              <Spinner color="#2563eb" size="large" />
            </Box>
          ) : stores.length ? (
            <VStack mt="$3" space="sm">
              {stores.map((store) => (
                <StoreCard key={store.id} store={store} />
              ))}
            </VStack>
          ) : (
            <EmptyState
              icon="storefront-outline"
              title="Nenhuma loja encontrada"
              description="Crie uma nova unidade ou ajuste a busca para encontrar o cadastro certo."
              actionLabel="Cadastrar loja"
              onAction={() => router.push('/stores/form')}
            />
          )}
        </VStack>
      </VStack>
    </PageShell>
  );
}
