import { useState } from 'react';
import { Flex, Heading, Button, Grid } from '@radix-ui/themes';
import { Plus } from 'lucide-react';
import { EventCard } from '../components/events/EventCard';
import { EventForm } from '../components/events/EventForm';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { useFetch } from '../hooks/useFetch';
import { eventService } from '../services/eventService';
import { clubService } from '../services/clubService';

export const EventsPage = () => {
  const [formOpen, setFormOpen] = useState(false);

  const { data: events, loading, error, refetch } = useFetch(() => eventService.getEvents());
  const { data: clubs } = useFetch(() => clubService.getClubs());

  const handleCreateEvent = async (eventData) => {
    await eventService.createEvent(eventData);
    refetch();
  };

  if (loading) {
    return <LoadingSpinner message="Loading events..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  return (
    <Flex direction="column" gap="6">
      <Flex justify="between" align="center">
        <Heading size="8">Events</Heading>
        <Button onClick={() => setFormOpen(true)}>
          <Plus size={16} /> Create Event
        </Button>
      </Flex>

      <Grid columns={{ initial: '1', sm: '2', md: '3' }} gap="4">
        {events?.map(event => (
          <EventCard key={event.id} event={event} clubs={clubs} />
        ))}
      </Grid>

      <EventForm
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleCreateEvent}
        clubs={clubs}
      />
    </Flex>
  );
};
