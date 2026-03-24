import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Box, Button, ButtonText, Heading, Text, VStack } from '@gluestack-ui/themed';
import type { ComponentProps } from 'react';

type EmptyStateProps = {
  actionLabel: string;
  description: string;
  icon: ComponentProps<typeof MaterialCommunityIcons>['name'];
  onAction: () => void;
  title: string;
  variant?: 'dark' | 'light';
};

export function EmptyState({
  actionLabel,
  description,
  icon,
  onAction,
  title,
  variant = 'light',
}: EmptyStateProps) {
  const isDark = variant === 'dark';

  return (
    <Box
      alignItems="center"
      bg={isDark ? '#11203b' : '$warmGray50'}
      borderColor={isDark ? '#31517f' : undefined}
      borderRadius="$2xl"
      borderWidth={isDark ? 1 : 0}
      px="$6"
      py="$12"
    >
      <VStack alignItems="center" space="md">
        <Box
          alignItems="center"
          bg={isDark ? '#1d3458' : '#fde7cf'}
          borderRadius="$full"
          h={64}
          justifyContent="center"
          w={64}
        >
          <MaterialCommunityIcons
            color={isDark ? '#93c5fd' : '#c46319'}
            name={icon}
            size={28}
          />
        </Box>
        <Heading color={isDark ? '$white' : undefined} size="lg" textAlign="center">
          {title}
        </Heading>
        <Text color={isDark ? '#c7d7ef' : '$trueGray500'} textAlign="center">
          {description}
        </Text>
        <Button
          alignItems="center"
          bg="#f76707"
          borderRadius="$full"
          h="$12"
          justifyContent="center"
          minWidth={220}
          onPress={onAction}
          px="$6"
        >
          <ButtonText
            color="$white"
            fontSize="$md"
            fontWeight="$bold"
            textAlign="center"
            width="100%"
          >
            {actionLabel}
          </ButtonText>
        </Button>
      </VStack>
    </Box>
  );
}
