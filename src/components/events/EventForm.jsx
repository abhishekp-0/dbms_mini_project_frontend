import { useState } from 'react';
import { Dialog, Button, Flex, TextField, TextArea, Select } from '@radix-ui/themes';
import toast from 'react-hot-toast';

export const EventForm = ({ open, onOpenChange, onSubmit, clubs }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [clubId, setClubId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit({
        title,
        description,
        date,
        time: time + ':00', // Add seconds
        club_id: parseInt(clubId)
      });
      toast.success('Event created successfully!');
      setTitle('');
      setDescription('');
      setDate('');
      setTime('');
      setClubId('');
      onOpenChange(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Create New Event</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Schedule a new event for a club
        </Dialog.Description>

        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="3">
            <label>
              <Flex direction="column" gap="1">
                <span style={{ fontSize: '14px', fontWeight: '500' }}>Title *</span>
                <TextField.Root
                  placeholder="Enter event title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </Flex>
            </label>

            <label>
              <Flex direction="column" gap="1">
                <span style={{ fontSize: '14px', fontWeight: '500' }}>Description</span>
                <TextArea
                  placeholder="Enter event description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                />
              </Flex>
            </label>

            <label>
              <Flex direction="column" gap="1">
                <span style={{ fontSize: '14px', fontWeight: '500' }}>Date *</span>
                <TextField.Root
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </Flex>
            </label>

            <label>
              <Flex direction="column" gap="1">
                <span style={{ fontSize: '14px', fontWeight: '500' }}>Time *</span>
                <TextField.Root
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
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
                {loading ? 'Creating...' : 'Create Event'}
              </Button>
            </Flex>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};
