import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { AppProvider } from '../src/shared/providers/app-provider';

export default function RootLayout() {
  return (
    <AppProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShadowVisible: false,
          headerStyle: { backgroundColor: '#eef4ff' },
          headerTintColor: '#11203b',
          headerTitleStyle: { fontWeight: '700' },
          contentStyle: { backgroundColor: '#eef4ff' },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="stores/index" options={{ title: 'Painel' }} />
        <Stack.Screen name="stores/list" options={{ title: 'Lojas cadastradas' }} />
        <Stack.Screen name="stores/[storeId]" options={{ title: 'Produtos da loja' }} />
        <Stack.Screen
          name="stores/form"
          options={{ title: 'Loja', presentation: 'modal' }}
        />
        <Stack.Screen
          name="products/form"
          options={{ title: 'Produto', presentation: 'modal' }}
        />
      </Stack>
    </AppProvider>
  );
}
