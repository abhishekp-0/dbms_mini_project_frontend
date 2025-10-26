import { Card, Flex, Heading, Text, Badge } from '@radix-ui/themes';
import { Rocket, Edit, Trash2 } from 'lucide-react';
import { formatDate, formatTime } from '../../utils/helpers';
import { Button } from '@radix-ui/themes';

export const ActivityCard = ({ activity, clubs, onEdit, onDelete }) => {
  const activityClub = clubs?.find(c => c.id === activity.club_id);

  return (
    <Card>
      <Flex direction="column" gap="3">
        <Flex justify="between" align="start">
          <Heading size="4">{activity.topic}</Heading>
          <Rocket size={20} color="var(--accent-9)" />
        </Flex>

        <Flex direction="column" gap="1">
          <Text size="2">
            👤 <strong>Speaker:</strong> {activity.speaker}
          </Text>
          <Text size="2">
            📍 <strong>Venue:</strong> {activity.venue}
          </Text>
          <Text size="2">
            📅 {formatDate(activity.activity_date)}
          </Text>
          <Text size="2">
            🕒 {formatTime(activity.activity_time)} ({activity.duration} mins)
          </Text>
        </Flex>

        <Flex gap="2" wrap="wrap">
          <Badge color="blue" variant="soft">{activity.type}</Badge>
          <Badge color="green" variant="soft">{activity.scope}</Badge>
          {activityClub && <Badge color="purple">{activityClub.name}</Badge>}
        </Flex>

        <Flex gap="2">
            <Button size="1" variant="soft" onClick={() => onEdit(activity)}>
              <Edit size={14} /> Edit
            </Button>
            <Button size="1" variant="soft" color="red" onClick={() => onDelete(activity)}>
              <Trash2 size={14} /> Delete
            </Button>
        </Flex>
      </Flex>
    </Card>
  );
};
