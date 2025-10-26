import { useState } from 'react';
import { Dialog, Button, Flex, TextField, TextArea } from '@radix-ui/themes';
import toast from 'react-hot-toast';

export const ClubForm = ({ open, onOpenChange, onSubmit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit({ name, description });
      toast.success('Club created successfully!');
      setName('');
      setDescription('');
      onOpenChange(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create club');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Create New Club</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Add a new club to the system
        </Dialog.Description>

        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="3">
            <label>
              <Flex direction="column" gap="1">
                <span style={{ fontSize: '14px', fontWeight: '500' }}>Club Name *</span>
                <TextField.Root
                  placeholder="Enter club name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Flex>
            </label>

            <label>
              <Flex direction="column" gap="1">
                <span style={{ fontSize: '14px', fontWeight: '500' }}>Description</span>
                <TextArea
                  placeholder="Enter club description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
              </Flex>
            </label>

            <Flex gap="3" mt="4" justify="end">
              <Dialog.Close>
                <Button variant="soft" color="gray" type="button">
                  Cancel
                </Button>
              </Dialog.Close>
              <Button type="submit" disabled={loading}>
                {loading ? 'Creating...' : 'Create Club'}
              </Button>
            </Flex>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};
