import { useLocalSearchParams, useRouter } from 'expo-router';

import {
  Box,
  Button,
  ButtonText,
  Heading,
  Input,
  InputField,
  Text,
  Textarea,
  TextareaInput,
  VStack,
} from '@gluestack-ui/themed';

import { useEffect, useState } from 'react';

import { useCreateStoreMutation, useStoreByIdQuery, useUpdateStoreMutation } from '../../src/features/stores/store.queries';
import { storeInputSchema, type StoreInput } from '../../src/features/stores/store.schemas';
import { PageShell } from '../../src/shared/components/page-shell';

export default function StoreFormScreen() {
  const { storeId } = useLocalSearchParams<{ storeId?: string }>();
  const router = useRouter();
  const store = useStoreByIdQuery(storeId);
  const createStore = useCreateStoreMutation();
  const updateStore = useUpdateStoreMutation();
  const [form, setForm] = useState<StoreInput>({ name: '', address: '' });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (store.data) {
      setForm({ name: store.data.name, address: store.data.address });
    }
  }, [store.data]);

  const handleSubmit = async () => {
    const parsed = storeInputSchema.safeParse(form);

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'Formulario invalido.');
      return;
    }

    setError(null);

    if (storeId) {
      await updateStore.mutateAsync({ id: storeId, input: parsed.data });
    } else {
      await createStore.mutateAsync(parsed.data);
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
              Formulario da loja
            </Text>
            <Heading color="$white" size="2xl">
              {storeId ? 'Editar loja' : 'Cadastrar nova loja'}
            </Heading>
            <Text color="#dbeafe" fontSize="$md">
              Nome e endereco sao obrigatorios para manter a filial identificada.
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
                Nome da loja
              </Text>
              <Input bg="#1d3458" borderColor="#31517f" borderRadius="$xl" borderWidth={1}>
                <InputField
                  color="#eff6ff"
                  placeholder="Ex.: Loja Batista Centro"
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
                Endereco
              </Text>
              <Textarea bg="#1d3458" borderColor="#31517f" borderRadius="$xl" borderWidth={1}>
                <TextareaInput
                  color="#eff6ff"
                  placeholder="Rua, numero, bairro e cidade"
                  placeholderTextColor="#9db4d4"
                  value={form.address}
                  onChangeText={(value) =>
                    setForm((current) => ({ ...current, address: value }))
                  }
                />
              </Textarea>
            </VStack>

            {error ? <Text color="#fca5a5">{error}</Text> : null}

            <Button
              alignItems="center"
              bg="#f76707"
              borderRadius="$full"
              h="$12"
              isDisabled={createStore.isPending || updateStore.isPending}
              justifyContent="center"
              onPress={handleSubmit}
            >
              <ButtonText color="$white" fontWeight="$bold" textAlign="center" width="100%">
                {storeId ? 'Salvar alteracoes' : 'Criar loja'}
              </ButtonText>
            </Button>
          </VStack>
        </Box>
      </VStack>
    </PageShell>
  );
}
