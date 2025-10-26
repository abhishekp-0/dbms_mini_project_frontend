import { useState } from 'react';
import { Dialog, Button, Flex, TextField, TextArea, Select } from '@radix-ui/themes';
import toast from 'react-hot-toast';

export const BudgetForm = ({ open, onOpenChange, onSubmit, events }) => {
  const [eventId, setEventId] = useState('');
  const [allocatedAmount, setAllocatedAmount] = useState('');
  const [spentAmount, setSpentAmount] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit({
        event_id: parseInt(eventId),
        allocated_amount: parseFloat(allocatedAmount),
        spent_amount: parseFloat(spentAmount) || 0,
        notes
      });
      toast.success('Budget created successfully!');
      setEventId('');
      setAllocatedAmount('');
      setSpentAmount('');
      setNotes('');
      onOpenChange(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create budget');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Create Budget</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Allocate budget for an event
        </Dialog.Description>

        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="3">
            <label>
              <Flex direction="column" gap="1">
                <span style={{ fontSize: '14px', fontWeight: '500' }}>Event *</span>
                <Select.Root value={eventId} onValueChange={setEventId} required>
                  <Select.Trigger placeholder="Select event" />
                  <Select.Content>
                    {events?.map(event => (
                      <Select.Item key={event.id} value={event.id.toString()}>
                        {event.title}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Root>
              </Flex>
            </label>

            <label>
              <Flex direction="column" gap="1">
                <span style={{ fontSize: '14px', fontWeight: '500' }}>Allocated Amount (₹) *</span>
                <TextField.Root
                  type="number"
                  step="0.01"
                  placeholder="Enter allocated amount"
                  value={allocatedAmount}
                  onChange={(e) => setAllocatedAmount(e.target.value)}
                  required
                />
              </Flex>
            </label>

            <label>
              <Flex direction="column" gap="1">
                <span style={{ fontSize: '14px', fontWeight: '500' }}>Spent Amount (₹)</span>
                <TextField.Root
                  type="number"
                  step="0.01"
                  placeholder="Enter spent amount"
                  value={spentAmount}
                  onChange={(e) => setSpentAmount(e.target.value)}
                />
              </Flex>
            </label>

            <label>
              <Flex direction="column" gap="1">
                <span style={{ fontSize: '14px', fontWeight: '500' }}>Notes</span>
                <TextArea
                  placeholder="Enter notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </Flex>
            </label>

            <Flex gap="3" mt="4" justify="end">
              <Dialog.Close>
                <Button variant="soft" color="gray" type="button">
                  Cancel
                </Button>
              </Dialog.Close>
              <Button type="submit" disabled={loading || !eventId}>
                {loading ? 'Creating...' : 'Create Budget'}
              </Button>
            </Flex>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};
