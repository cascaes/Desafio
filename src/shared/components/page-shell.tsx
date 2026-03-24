import { Box } from '@gluestack-ui/themed';
import { LinearGradient } from 'expo-linear-gradient';

import { PropsWithChildren } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function PageShell({ children }: PropsWithChildren) {
  return (
    <LinearGradient colors={['#eef4ff', '#f8fbff', '#edf7f7']} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            paddingTop: 10,
            paddingBottom: 28,
            paddingHorizontal: 4,
          }}
          showsVerticalScrollIndicator={false}
        >
          <Box>{children}</Box>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}
