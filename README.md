# Desafio Tecnico React Native Expo

Aplicativo mobile multiplataforma para cadastro de lojas e produtos, implementado com Expo Router, TypeScript, Gluestack UI, Zustand, MSW e persistencia offline com AsyncStorage.

## Stack utilizada

- Node 20.19.4
- Expo SDK 55
- React 19.2.0
- React Native 0.83.2
- Expo Router 55
- Gluestack UI 1.1
- Zustand 5
- React Query 5
- MSW 2
- AsyncStorage 2.2
- Jest Expo 55

## Tecnicas aplicadas do documento

- Arquitetura modular por dominio
- Expo Router para navegacao
- UI com Gluestack UI
- Estado global com Zustand
- Mock de backend com endpoints `/stores` e `/products` via MSW
- Persistencia offline com AsyncStorage
- TypeScript com schemas e validacao
- Repository, Adapter e Factory simples
- Busca e filtro de lojas e produtos
- Layout responsivo para mobile e tablet
- Hooks customizados
- Testes unitarios

## Como executar

```bash
npm install --legacy-peer-deps
npx expo start
```

## Scripts

```bash
npm run test
npm run typecheck
```

## Estrutura resumida

- `app/`: rotas e telas com Expo Router
- `src/features/`: modulos de lojas, produtos e repositorios
- `src/mocks/`: mock backend com MSW e persistencia
- `src/shared/`: providers, componentes e utilitarios
- `src/store/`: estado global com Zustand
