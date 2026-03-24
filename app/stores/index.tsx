import { useRouter } from 'expo-router';

import { Box, Button, ButtonText, Heading, HStack, Text, VStack } from '@gluestack-ui/themed';

import { useMemo } from 'react';
import { useWindowDimensions } from 'react-native';

import { useStoresQuery } from '../../src/features/stores/store.queries';
import { MetricCard } from '../../src/shared/components/metric-card';
import { PageShell } from '../../src/shared/components/page-shell';
import { formatCurrency } from '../../src/shared/utils/currency';

export default function StoresDashboardScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const { data: stores = [] } = useStoresQuery();
  const isTablet = width >= 768;

  const metrics = useMemo(() => {
    const productsCount = stores.reduce(
      (total, current) => total + current.productsCount,
      0,
    );
    const stockValue = stores.reduce(
      (total, current) => total + current.stockValue,
      0,
    );

    return [
      {
        accent: '#60a5fa',
        label: 'Lojas ativas',
        onPress: () => router.push('/stores/list'),
        value: String(stores.length),
      },
      {
        accent: '#34d399',
        label: 'Produtos',
        value: String(productsCount),
      },
      {
        accent: '#f59e0b',
        label: 'Valor total',
        value: formatCurrency(stockValue),
      },
    ];
  }, [router, stores]);

  return (
    <PageShell>
      <VStack space="lg">
        <Box
          bg="#11203b"
          borderRadius="$3xl"
          overflow="hidden"
          px="$6"
          py="$7"
          position="relative"
        >
          <Box
            bg="#1d4ed8"
            borderRadius="$full"
            h={160}
            position="absolute"
            right={-40}
            top={-30}
            w={160}
          />
          <Box
            bg="#0f766e"
            borderRadius="$full"
            bottom={-60}
            h={140}
            position="absolute"
            right={70}
            w={140}
          />
          <VStack space="md">
            <Text color="#93c5fd" fontSize="$sm" fontWeight="$bold">
              Operacao centralizada
            </Text>
            <Heading color="$white" size={isTablet ? '3xl' : '2xl'}>
              Controle de lojas e estoque com uma entrada mais clara.
            </Heading>
            <Text color="#dbeafe" fontSize="$md" maxWidth={isTablet ? '75%' : '100%'}>
              Comece pelo painel geral e avance para a listagem completa quando
              quiser gerenciar as filiais cadastradas.
            </Text>
            <Button
              alignItems="center"
              bg="$white"
              borderRadius="$full"
              h="$12"
              justifyContent="center"
              mt="$4"
              onPress={() => router.push('/stores/list')}
              px="$5"
              width="100%"
            >
              <ButtonText
                color="#11203b"
                fontSize="$md"
                fontWeight="$bold"
                textAlign="center"
                width="100%"
              >
                Ver lojas cadastradas
              </ButtonText>
            </Button>
          </VStack>
        </Box>

        <HStack flexWrap="wrap" justifyContent="space-between" mt="$2">
          {metrics.map((metric) => (
            <Box
              key={metric.label}
              mb="$2"
              width={isTablet ? '32%' : '100%'}
            >
              <MetricCard
                accent={metric.accent}
                isCompact={!isTablet}
                label={metric.label}
                onPress={metric.onPress}
                value={metric.value}
              />
            </Box>
          ))}
        </HStack>
      </VStack>
    </PageShell>
  );
}
