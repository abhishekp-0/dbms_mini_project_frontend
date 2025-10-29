import { useState, useEffect } from 'react';
import { Dialog, Button, Flex, TextField, Select } from '@radix-ui/themes';
import { ACTIVITY_TYPES, ACTIVITY_SCOPES } from '../../utils/constants';
import toast from 'react-hot-toast';

export const ActivityForm = ({ open, onOpenChange, onSubmit, clubs, activity = null }) => {
  const [type, setType] = useState(ACTIVITY_TYPES.SEMINAR);
  const [scope, setScope] = useState(ACTIVITY_SCOPES.INTERNAL);
  const [venue, setVenue] = useState('');
  const [speaker, setSpeaker] = useState('');
  const [topic, setTopic] = useState('');
  const [activityDate, setActivityDate] = useState('');
  const [activityTime, setActivityTime] = useState('');
  const [duration, setDuration] = useState('');
  const [clubId, setClubId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activity) {
      setType(activity.type);
      setScope(activity.scope);
      setVenue(activity.venue);
      setSpeaker(activity.speaker);
      setTopic(activity.topic);
      setActivityDate(activity.activity_date);
      setActivityTime(activity.activity_time?.substring(0, 5) || '');
      setDuration(activity.duration?.toString() || '');
      setClubId(activity.club_id?.toString() || '');
    }
  }, [activity]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit({
        type,
        scope,
        venue,
        speaker,
        topic,
        activity_date: activityDate,
        activity_time: activityTime + ':00',
        duration: parseInt(duration),
        club_id: parseInt(clubId)
      });
      toast.success(activity ? 'Activity updated successfully!' : 'Activity created successfully!');
      resetForm();
      onOpenChange(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save activity');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setType(ACTIVITY_TYPES.SEMINAR);
    setScope(ACTIVITY_SCOPES.INTERNAL);
    setVenue('');
    setSpeaker('');
    setTopic('');
    setActivityDate('');
    setActivityTime('');
    setDuration('');
    setClubId('');
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content maxWidth="500px">
        <Dialog.Title>{activity ? 'Edit Activity' : 'Create New Activity'}</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          {activity ? 'Update activity details' : 'Add a new seminar or workshop'}
        </Dialog.Description>

        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="3">
            <Flex gap="3">
              <label style={{ flex: 1 }}>
                <Flex direction="column" gap="1">
                  <span style={{ fontSize: '14px', fontWeight: '500' }}>Type *</span>
                  <Select.Root value={type} onValueChange={setType}>
                    <Select.Trigger />
                    <Select.Content>
                      <Select.Item value={ACTIVITY_TYPES.SEMINAR}>Seminar</Select.Item>
                      <Select.Item value={ACTIVITY_TYPES.WORKSHOP}>Workshop</Select.Item>
                    </Select.Content>
                  </Select.Root>
                </Flex>
              </label>

              <label style={{ flex: 1 }}>
                <Flex direction="column" gap="1">
                  <span style={{ fontSize: '14px', fontWeight: '500' }}>Scope *</span>
                  <Select.Root value={scope} onValueChange={setScope}>
                    <Select.Trigger />
                    <Select.Content>
                      <Select.Item value={ACTIVITY_SCOPES.INTERNAL}>Internal</Select.Item>
                      <Select.Item value={ACTIVITY_SCOPES.EXTERNAL}>External</Select.Item>
                    </Select.Content>
                  </Select.Root>
                </Flex>
              </label>
            </Flex>

            <label>
              <Flex direction="column" gap="1">
                <span style={{ fontSize: '14px', fontWeight: '500' }}>Topic *</span>
                <TextField.Root
                  placeholder="Enter topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  required
                />
              </Flex>
            </label>

            <label>
              <Flex direction="column" gap="1">
                <span style={{ fontSize: '14px', fontWeight: '500' }}>Speaker *</span>
                <TextField.Root
                  placeholder="Enter speaker name"
                  value={speaker}
                  onChange={(e) => setSpeaker(e.target.value)}
                  required
                />
              </Flex>
            </label>

            <label>
              <Flex direction="column" gap="1">
                <span style={{ fontSize: '14px', fontWeight: '500' }}>Venue *</span>
                <TextField.Root
                  placeholder="Enter venue"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  required
                />
              </Flex>
            </label>

            <Flex gap="3">
              <label style={{ flex: 1 }}>
                <Flex direction="column" gap="1">
                  <span style={{ fontSize: '14px', fontWeight: '500' }}>Date *</span>
                  <TextField.Root
                    type="date"
                    value={activityDate}
                    onChange={(e) => setActivityDate(e.target.value)}
                    required
                  />
                </Flex>
              </label>

              <label style={{ flex: 1 }}>
                <Flex direction="column" gap="1">
                  <span style={{ fontSize: '14px', fontWeight: '500' }}>Time *</span>
                  <TextField.Root
                    type="time"
                    value={activityTime}
                    onChange={(e) => setActivityTime(e.target.value)}
                    required
                  />
                </Flex>
              </label>
            </Flex>

            <label>
              <Flex direction="column" gap="1">
                <span style={{ fontSize: '14px', fontWeight: '500' }}>Duration (minutes) *</span>
                <TextField.Root
                  type="number"
                  placeholder="Enter duration in minutes"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  required
                />
              </Flex>
            </label>

            <label>
              <Flex direction="column" gap="1">
                <span style={{ fontSize: '14px', fontWeight: '500' }}>Club *</span>
                <Select.Root value={clubId || ''} onValueChange={setClubId} required>
                  <Select.Trigger placeholder="Select club" />
                  <Select.Content>
                    {clubs && clubs.length > 0 && clubs.map(club => {
                      if (!club || !club.id || !club.name) return null;
                      return (
                        <Select.Item key={club.id} value={String(club.id)}>
                          {club.name}
                        </Select.Item>
                      );
                    })}
                  </Select.Content>
                </Select.Root>
              </Flex>
            </label>

            <Flex gap="3" mt="4" justify="end">
              <Dialog.Close>
                <Button variant="soft" color="gray" type="button">
                  Cancel
                </Button>
              </Dialog.Close>
              <Button type="submit" disabled={loading || !clubId}>
                {loading ? 'Saving...' : activity ? 'Update Activity' : 'Create Activity'}
              </Button>
            </Flex>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};
