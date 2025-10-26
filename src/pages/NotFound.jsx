import { Flex, Heading, Text } from '@radix-ui/themes';

export const NotFound = () => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      style={{ minHeight: '100vh' }}
      gap="3"
    >
      <Heading size="9">404</Heading>
      <Text size="5" color="gray">
        Page Not Found
      </Text>
    </Flex>
  );
};
