import { Box, Pressable, Text, VStack } from '@gluestack-ui/themed';

type MetricCardProps = {
  accent?: string;
  isCompact?: boolean;
  label: string;
  onPress?: () => void;
  value: string;
};

export function MetricCard({
  accent = '#2563eb',
  isCompact = false,
  label,
  onPress,
  value,
}: MetricCardProps) {
  const content = (
    <Box
      bg="#11203b"
      borderRadius="$3xl"
      minHeight={isCompact ? 88 : 124}
      p={isCompact ? '$3.5' : '$5'}
      width="100%"
    >
      <VStack space="xs">
        <Text color={accent} fontSize="$sm" fontWeight="$bold">
          {label}
        </Text>
        <Text color="$white" fontSize={isCompact ? '$xl' : '$2xl'} fontWeight="$bold">
          {value}
        </Text>
      </VStack>
    </Box>
  );

  if (!onPress) {
    return content;
  }

  return (
    <Pressable onPress={onPress} width="100%">
      {content}
    </Pressable>
  );
}
