import { Flex, Heading, Grid, Button, Card, Text, Box } from '@radix-ui/themes';
import { Plus, Users, User, Calendar, DollarSign } from 'lucide-react';
import { StatsCard } from '../components/common/StatsCard';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { clubService } from '../services/clubService';
import { memberService } from '../services/memberService';
import { eventService } from '../services/eventService';
import { budgetService } from '../services/budgetService';
import { activityService } from '../services/activityService';
import { formatDate, formatTime } from '../utils/helpers';

export const Dashboard = () => {
  const navigate = useNavigate();

  const { data: clubs, loading: clubsLoading, error: clubsError } = useFetch(() => clubService.getClubs());
  const { data: members, loading: membersLoading, error: membersError } = useFetch(() => memberService.getMembers());
  const { data: events, loading: eventsLoading, error: eventsError } = useFetch(() => eventService.getEvents());
  const { data: budgets, loading: budgetsLoading, error: budgetsError } = useFetch(() => budgetService.getBudgets());
  const { data: activities, loading: activitiesLoading } = useFetch(() => activityService.getActivities());

  const loading = clubsLoading || membersLoading || eventsLoading || budgetsLoading;
  const error = clubsError || membersError || eventsError || budgetsError;

  // Calculate stats
  const upcomingEvents = events?.filter(event => new Date(event.date) >= new Date()) || [];
  const totalAllocated = budgets?.reduce((sum, b) => sum + parseFloat(b.allocated_amount || 0), 0) || 0;
  const totalSpent = budgets?.reduce((sum, b) => sum + parseFloat(b.spent_amount || 0), 0) || 0;
  const recentActivities = activities?.slice(0, 5) || [];

  if (loading && !clubs) {
    return <LoadingSpinner message="Loading dashboard..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <Flex direction="column" gap="6">
      <Flex justify="between" align="center">
        <Heading size="8">Dashboard</Heading>
        <Flex gap="2">
          <Button onClick={() => navigate('/clubs')}>
            <Plus size={16} /> New Club
          </Button>
          <Button variant="soft" onClick={() => navigate('/events')}>
            <Plus size={16} /> New Event
          </Button>
        </Flex>
      </Flex>

      {/* Stats Cards */}
      <Grid columns={{ initial: '1', sm: '2', md: '4' }} gap="4">
        <StatsCard
          title="Total Clubs"
          value={clubs?.length || 0}
          icon={<Users size={24} />}
          color="blue"
        />
        <StatsCard
          title="Total Members"
          value={members?.length || 0}
          icon={<User size={24} />}
          color="green"
        />
        <StatsCard
          title="Upcoming Events"
          value={upcomingEvents.length}
          icon={<Calendar size={24} />}
          color="orange"
        />
        <StatsCard
          title="Budget Remaining"
          value={`₹${Math.max(0, totalAllocated - totalSpent).toLocaleString()}`}
          icon={<DollarSign size={24} />}
          color="purple"
        />
      </Grid>

      <Grid columns={{ initial: '1', md: '2' }} gap="4">
        {/* Recent Activities */}
        <Card>
          <Flex direction="column" gap="3">
            <Heading size="5">Recent Activities</Heading>
            {activitiesLoading ? (
              <LoadingSpinner message="Loading activities..." />
            ) : recentActivities.length === 0 ? (
              <Text size="2" color="gray">No activities yet</Text>
            ) : (
              <Flex direction="column" gap="2">
                {recentActivities.map((activity) => (
                  <Box key={activity.id} p="2" style={{ borderBottom: '1px solid var(--gray-5)' }}>
                    <Text size="2" weight="bold">{activity.topic}</Text>
                    <Text size="1" color="gray">
                      {formatDate(activity.activity_date)} • {formatTime(activity.activity_time)}
                    </Text>
                    <Text size="1" color="gray">
                      {activity.type} • {activity.speaker}
                    </Text>
                  </Box>
                ))}
              </Flex>
            )}
          </Flex>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <Flex direction="column" gap="3">
            <Heading size="5">Upcoming Events</Heading>
            {eventsLoading ? (
              <LoadingSpinner message="Loading events..." />
            ) : upcomingEvents.length === 0 ? (
              <Text size="2" color="gray">No upcoming events</Text>
            ) : (
              <Flex direction="column" gap="2">
                {upcomingEvents.slice(0, 5).map((event) => (
                  <Box key={event.id} p="2" style={{ borderBottom: '1px solid var(--gray-5)' }}>
                    <Text size="2" weight="bold">{event.title}</Text>
                    <Text size="1" color="gray">
                      {formatDate(event.date)} • {formatTime(event.time)}
                    </Text>
                  </Box>
                ))}
              </Flex>
            )}
          </Flex>
        </Card>
      </Grid>
    </Flex>
  );
};
