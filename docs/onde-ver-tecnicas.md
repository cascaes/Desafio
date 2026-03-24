# Onde ver as tecnicas aplicadas

Este arquivo aponta onde cada tecnica pode ser vista no projeto, com 1 ou 2 exemplos por item.

## Arquitetura modular por dominio

- `src/features/stores/`: concentracao do dominio de lojas (`store.schemas.ts`, `store.repository.ts`, `store.queries.ts`, `components/store-card.tsx`).
- `src/features/products/`: concentracao do dominio de produtos (`product.schemas.ts`, `product.repository.ts`, `product.queries.ts`, `components/product-card.tsx`).

## Expo Router para navegacao

- `app/_layout.tsx`: configuracao do stack de rotas da aplicacao.
- `app/stores/index.tsx` e `app/stores/list.tsx`: uso de `useRouter()` e `router.push(...)` para navegar entre painel, lista e formularios.

## UI com Gluestack UI

- `src/shared/providers/app-provider.tsx`: `GluestackUIProvider` com `gluestackUIConfig`.
- `app/stores/[storeId].tsx`: composicao de tela usando `Box`, `VStack`, `HStack`, `Button`, `Input` e `Heading`.

## Estado global com Zustand

- `src/store/ui-store.ts`: store global com `useUiStore` e `productSearch`.
- `app/stores/list.tsx` e `app/stores/[storeId].tsx`: leitura e escrita do estado global para busca de lojas e produtos.

## Mock de backend com endpoints `/stores` e `/products`

- `src/mocks/handlers.ts`: roteamento dos endpoints mockados (`GET /stores`, `POST /stores`, `POST /products`, `PUT/DELETE`).
- `src/shared/api/api-client.ts`: cliente central que envia as requisicoes para o mock local.

Observacao:
- A dependencia `msw` continua no projeto (`package.json`), mas a execucao atual no app usa `handleMockRequest(...)` em vez de `msw/native`, por compatibilidade com Expo Go.

## Persistencia offline com AsyncStorage

- `src/mocks/db.ts`: leitura e escrita do banco local com `AsyncStorage.getItem` e `AsyncStorage.setItem`.
- `src/shared/providers/app-provider.tsx`: `ensureDatabaseSeeded()` no bootstrap para popular o armazenamento local na inicializacao.

## TypeScript com schemas e validacao

- `src/features/stores/store.schemas.ts`: `storeSchema` e `storeInputSchema` com `zod`.
- `src/features/products/product.schemas.ts`: `productSchema` e `productInputSchema`, incluindo validacao de preco maior que zero.

## Repository, Adapter e Factory simples

- `src/features/stores/store.repository.ts` e `src/features/products/product.repository.ts`: encapsulam operacoes de leitura/escrita.
- `src/features/stores/store.adapters.ts` e `src/features/products/product.adapters.ts`: conversao de DTO para modelo de dominio.
- `src/features/inventory/repository.factory.ts`: `createInventoryRepository()` monta a factory de repositores.

## Busca e filtro de lojas e produtos

- `app/stores/list.tsx`: busca de lojas com `storesSearch` + `useDebouncedValue(...)`.
- `app/stores/[storeId].tsx`: filtro de produtos com `productSearch` + `useMemo(...)`.

## Layout responsivo para mobile e tablet

- `app/stores/index.tsx`: uso de `useWindowDimensions()` para adaptar tipografia e layout no dashboard.
- `src/features/stores/components/store-card.tsx`: ajuste do card conforme largura com `isCompact`.

## Hooks customizados

- `src/shared/hooks/use-debounced-value.ts`: hook proprio para debounce de busca.
- `app/stores/list.tsx` e `app/stores/[storeId].tsx`: uso real do hook nas buscas.

## Testes unitarios

- `__tests__/store.adapters.test.ts`: teste do adapter de lojas.
- `__tests__/currency.test.ts`: teste da formatacao monetaria.
