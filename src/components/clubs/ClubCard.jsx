import { Card, Flex, Heading, Text, Badge } from '@radix-ui/themes';
import { Users } from 'lucide-react';

export const ClubCard = ({ club, onClick }) => {
  return (
    <Card style={{ cursor: 'pointer' }} onClick={onClick}>
      <Flex direction="column" gap="3">
        <Flex justify="between" align="start">
          <Heading size="4">{club.name}</Heading>
          <Users size={20} color="var(--accent-9)" />
        </Flex>
        <Text size="2" color="gray">
          {club.description || 'No description available'}
        </Text>
        <Flex gap="2">
          <Badge color="blue" variant="soft">
            Club ID: {club.id}
          </Badge>
        </Flex>
      </Flex>
    </Card>
  );
};
