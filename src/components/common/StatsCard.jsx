import { Card, Flex, Text, Heading } from '@radix-ui/themes';

export const StatsCard = ({ title, value, icon, color = 'blue' }) => {
  return (
    <Card>
      <Flex direction="column" gap="2">
        <Flex justify="between" align="center">
          <Text size="2" weight="medium" color="gray">
            {title}
          </Text>
          {icon && <span style={{ color: `var(--${color}-9)` }}>{icon}</span>}
        </Flex>
        <Heading size="6" weight="bold">
          {value}
        </Heading>
      </Flex>
    </Card>
  );
};
