import { useParams } from 'react-router-dom';
import { Flex, Heading, Card, Text, Grid, Box, Badge } from '@radix-ui/themes';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { useFetch } from '../hooks/useFetch';
import { clubService } from '../services/clubService';

export const ClubDetailsPage = () => {
  const { clubId } = useParams();

  const { data: heads, loading: headsLoading } = useFetch(() => clubService.getClubHeads(clubId), [clubId]);
  const { data: events, loading: eventsLoading } = useFetch(() => clubService.getClubEvents(clubId), [clubId]);
  const { data: activities, loading: activitiesLoading } = useFetch(() => clubService.getClubActivities(clubId), [clubId]);

  const loading = headsLoading || eventsLoading || activitiesLoading;

  if (loading) {
    return <LoadingSpinner message="Loading club details..." />;
  }

  const formatDate = (iso) => {
    if (!iso) return '';
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
  };

  return (
    <Flex direction="column" gap="6">
      <Heading size="8">Club Details</Heading>

      <Grid columns={{ initial: '1', md: '2' }} gap="4">
        <Card>
          <Flex direction="column" gap="3">
            <Heading size="5">Club Heads</Heading>
            {!heads || heads.length === 0 ? (
              <Text size="2" color="gray">No heads assigned</Text>
            ) : (
              <Flex direction="column" gap="2">
                {heads.map((head) => (
                  <Box key={head.id} p="2" style={{ borderBottom: '1px solid var(--gray-5)' }}>
                    <Text size="2" weight="bold">{head.name}</Text>
                    <Text size="1" color="gray"> ({head.role})</Text>
                  </Box>
                ))}
              </Flex>
            )}
          </Flex>
        </Card>

        <Card>
          <Flex direction="column" gap="3">
            <Heading size="5">Events</Heading>
            {!events || events.length === 0 ? (
              <Text size="2" color="gray">No events</Text>
            ) : (
              <Flex direction="column" gap="2">
                {events.map((event) => (
                  <Box key={event.id} p="2" style={{ borderBottom: '1px solid var(--gray-5)' }}>
                    <Text size="2" weight="bold">{event.title}</Text>
                    <Text size="1" color="gray">{formatDate(event.date)}</Text>
                  </Box>
                ))}
              </Flex>
            )}
          </Flex>
        </Card>
      </Grid>

      <Card>
        <Flex direction="column" gap="3">
          <Heading size="5">Activities</Heading>
          {!activities || activities.length === 0 ? (
            <Text size="2" color="gray">No activities</Text>
          ) : (
            <Flex direction="column" gap="2">
              {activities.map((activity) => (
                <Box key={activity.id} p="2" style={{ borderBottom: '1px solid var(--gray-5)' }}>
                  <Flex justify="between" align="center">
                    <Text size="2" weight="bold">{activity.topic}</Text>
                    <Flex gap="2">
                      <Badge color="blue">{activity.type}</Badge>
                      <Badge color="green">{activity.scope}</Badge>
                    </Flex>
                  </Flex>
                  <Text size="1" color="gray">{activity.speaker}</Text>
                </Box>
              ))}
            </Flex>
          )}
        </Flex>
      </Card>
    </Flex>
  );
};
