import { gluestackUIConfig } from '@gluestack-ui/config';
import { Box, GluestackUIProvider, Spinner } from '@gluestack-ui/themed';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ensureDatabaseSeeded } from '../../mocks/db';
import { startMockServer } from '../../mocks/server';

export function AppProvider({ children }: PropsWithChildren) {
  const [ready, setReady] = useState(false);
  const queryClient = useMemo(() => new QueryClient(), []);

  useEffect(() => {
    const bootstrap = async () => {
      await ensureDatabaseSeeded();
      await startMockServer();
      setReady(true);
    };

    void bootstrap();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <GluestackUIProvider config={gluestackUIConfig}>
            {ready ? (
              children
            ) : (
              <Box
                flex={1}
                alignItems="center"
                justifyContent="center"
                bg="$warmGray50"
              >
                <Spinner size="large" color="$orange600" />
              </Box>
            )}
          </GluestackUIProvider>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
