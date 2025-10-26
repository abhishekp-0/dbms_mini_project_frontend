import { Card, Flex, Heading, Text, Badge } from '@radix-ui/themes';
import { Calendar } from 'lucide-react';
import { formatDate, formatTime } from '../../utils/helpers';

export const EventCard = ({ event, clubs }) => {
  const eventClub = clubs?.find(c => c.id === event.club_id);
  
  return (
    <Card>
      <Flex direction="column" gap="3">
        <Flex justify="between" align="start">
          <Heading size="4">{event.title}</Heading>
          <Calendar size={20} color="var(--accent-9)" />
        </Flex>
        <Text size="2" color="gray">
          {event.description || 'No description'}
        </Text>
        <Flex direction="column" gap="1">
          <Text size="2">
            📅 {formatDate(event.date)}
          </Text>
          <Text size="2">
            🕒 {formatTime(event.time)}
          </Text>
        </Flex>
        <Flex gap="2">
          {eventClub && <Badge color="blue">{eventClub.name}</Badge>}
        </Flex>
      </Flex>
    </Card>
  );
};
