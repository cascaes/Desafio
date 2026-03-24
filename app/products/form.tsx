import { useLocalSearchParams, useRouter } from 'expo-router';

import {
  Box,
  Button,
  ButtonText,
  Heading,
  Input,
  InputField,
  Text,
  VStack,
} from '@gluestack-ui/themed';

import { useEffect, useState } from 'react';

import { useCreateProductMutation, useProductByIdQuery, useUpdateProductMutation } from '../../src/features/products/product.queries';
import { productInputSchema, type ProductInput } from '../../src/features/products/product.schemas';
import { PageShell } from '../../src/shared/components/page-shell';

export default function ProductFormScreen() {
  const { productId, storeId } = useLocalSearchParams<{
    productId?: string;
    storeId?: string;
  }>();
  const router = useRouter();
  const product = useProductByIdQuery(productId);
  const createProduct = useCreateProductMutation();
  const updateProduct = useUpdateProductMutation();
  const [form, setForm] = useState<ProductInput>({
    storeId: storeId ?? '',
    name: '',
    category: '',
    price: '',
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (product.data) {
      setForm({
        storeId: product.data.storeId,
        name: product.data.name,
        category: product.data.category,
        price: String(product.data.price),
      });
    }
  }, [product.data]);

  const handleSubmit = async () => {
    const parsed = productInputSchema.safeParse(form);

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'Formulario invalido.');
      return;
    }

    setError(null);

    if (productId) {
      await updateProduct.mutateAsync({ id: productId, input: parsed.data });
    } else {
      await createProduct.mutateAsync(parsed.data);
    }

    router.back();
  };

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
              Formulario de produto
            </Text>
            <Heading color="$white" size="2xl">
              {productId ? 'Editar produto' : 'Cadastrar novo produto'}
            </Heading>
            <Text color="#dbeafe" fontSize="$md">
              Mantenha nome, categoria e preco organizados para cada loja.
            </Text>
          </VStack>
        </Box>

        <Box
          bg="#162847"
          borderColor="#28456f"
          borderRadius="$3xl"
          borderWidth={1}
          p="$5"
        >
          <VStack space="lg">
            <VStack space="sm">
              <Text color="#93c5fd" fontWeight="$bold">
                Nome do produto
              </Text>
              <Input bg="#1d3458" borderColor="#31517f" borderRadius="$xl" borderWidth={1}>
                <InputField
                  color="#eff6ff"
                  placeholder="Ex.: Cafeteira eletrica"
                  placeholderTextColor="#9db4d4"
                  value={form.name}
                  onChangeText={(value) =>
                    setForm((current) => ({ ...current, name: value }))
                  }
                />
              </Input>
            </VStack>

            <VStack space="sm">
              <Text color="#93c5fd" fontWeight="$bold">
                Categoria
              </Text>
              <Input bg="#1d3458" borderColor="#31517f" borderRadius="$xl" borderWidth={1}>
                <InputField
                  color="#eff6ff"
                  placeholder="Ex.: Eletroportateis"
                  placeholderTextColor="#9db4d4"
                  value={form.category}
                  onChangeText={(value) =>
                    setForm((current) => ({ ...current, category: value }))
                  }
                />
              </Input>
            </VStack>

            <VStack space="sm">
              <Text color="#93c5fd" fontWeight="$bold">
                Preco
              </Text>
              <Input bg="#1d3458" borderColor="#31517f" borderRadius="$xl" borderWidth={1}>
                <InputField
                  color="#eff6ff"
                  keyboardType="decimal-pad"
                  placeholder="149.90"
                  placeholderTextColor="#9db4d4"
                  value={form.price}
                  onChangeText={(value) =>
                    setForm((current) => ({ ...current, price: value }))
                  }
                />
              </Input>
            </VStack>

            {error ? <Text color="#fca5a5">{error}</Text> : null}

            <Button
              alignItems="center"
              bg="#f76707"
              borderRadius="$full"
              h="$12"
              isDisabled={createProduct.isPending || updateProduct.isPending}
              justifyContent="center"
              onPress={handleSubmit}
            >
              <ButtonText color="$white" fontWeight="$bold" textAlign="center" width="100%">
                {productId ? 'Salvar alteracoes' : 'Criar produto'}
              </ButtonText>
            </Button>
          </VStack>
        </Box>
      </VStack>
    </PageShell>
  );
}
