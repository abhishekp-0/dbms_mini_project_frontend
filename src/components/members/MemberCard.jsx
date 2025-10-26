import { Card, Flex, Heading, Text, Badge } from '@radix-ui/themes';
import { User, Mail } from 'lucide-react';

export const MemberCard = ({ member, clubs }) => {
  const memberClub = clubs?.find(c => c.id === member.club_id);
  
  return (
    <Card>
      <Flex direction="column" gap="3">
        <Flex justify="between" align="start">
          <Heading size="4">{member.name}</Heading>
          <User size={20} color="var(--accent-9)" />
        </Flex>
        <Flex direction="column" gap="1">
          <Flex align="center" gap="2">
            <Mail size={14} />
            <Text size="2" color="gray">{member.email}</Text>
          </Flex>
        </Flex>
        <Flex gap="2" wrap="wrap">
          <Badge color="green" variant="soft">{member.role}</Badge>
          {memberClub && <Badge color="blue">{memberClub.name}</Badge>}
        </Flex>
      </Flex>
    </Card>
  );
};
