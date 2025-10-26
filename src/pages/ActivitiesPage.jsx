import { useState } from 'react';
import { Flex, Heading, Button, Grid } from '@radix-ui/themes';
import { Plus } from 'lucide-react';
import { ActivityCard } from '../components/activities/ActivityCard';
import { ActivityForm } from '../components/activities/ActivityForm';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { useFetch } from '../hooks/useFetch';
import { activityService } from '../services/activityService';
import { clubService } from '../services/clubService';
import toast from 'react-hot-toast';

export const ActivitiesPage = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, activity: null });

  const { data: activities, loading, error, refetch } = useFetch(() => activityService.getActivities());
  const { data: clubs } = useFetch(() => clubService.getClubs());

  const handleCreateActivity = async (activityData) => {
    await activityService.createActivity(activityData);
    refetch();
  };

  const handleEditActivity = async (activityData) => {
    await activityService.updateActivity(editingActivity.id, activityData);
    setEditingActivity(null);
    refetch();
  };

  const handleDeleteClick = (activity) => {
    setDeleteDialog({ open: true, activity });
  };

  const handleDeleteConfirm = async () => {
    try {
      await activityService.deleteActivity(deleteDialog.activity.id);
      toast.success('Activity deleted successfully!');
      setDeleteDialog({ open: false, activity: null });
      refetch();
    } catch (error) {
      toast.error('Failed to delete activity');
    }
  };

  const handleEdit = (activity) => {
    setEditingActivity(activity);
    setFormOpen(true);
  };

  if (loading) {
    return <LoadingSpinner message="Loading activities..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  return (
    <Flex direction="column" gap="6">
      <Flex justify="between" align="center">
        <Heading size="8">Activities</Heading>
        <Button onClick={() => { setEditingActivity(null); setFormOpen(true); }}>
          <Plus size={16} /> Create Activity
        </Button>
      </Flex>

      <Grid columns={{ initial: '1', sm: '2', md: '3' }} gap="4">
        {activities?.map(activity => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            clubs={clubs}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
          />
        ))}
      </Grid>

      <ActivityForm
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setEditingActivity(null);
        }}
        onSubmit={editingActivity ? handleEditActivity : handleCreateActivity}
        clubs={clubs}
        activity={editingActivity}
      />

      <ConfirmDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ open, activity: null })}
        title="Delete Activity"
        description={`Are you sure you want to delete "${deleteDialog.activity?.topic}"? This action cannot be undone.`}
        onConfirm={handleDeleteConfirm}
        confirmText="Delete"
        danger
      />
    </Flex>
  );
};
