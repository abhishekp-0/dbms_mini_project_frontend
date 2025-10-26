import { useState } from 'react';
import { Dialog, Button, Flex, TextField, Select } from '@radix-ui/themes';
import { MEMBER_ROLES } from '../../utils/constants';
import toast from 'react-hot-toast';

export const MemberForm = ({ open, onOpenChange, onSubmit, clubs }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(MEMBER_ROLES.MEMBER);
  const [clubId, setClubId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await onSubmit({
        name,
        email,
        role,
        club_id: clubId ? parseInt(clubId) : null
      });
      toast.success('Member added successfully!');
      setName('');
      setEmail('');
      setRole(MEMBER_ROLES.MEMBER);
      setClubId('');
      onOpenChange(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add member');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Add New Member</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Add a new member to the system
        </Dialog.Description>

        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="3">
            <label>
              <Flex direction="column" gap="1">
                <span style={{ fontSize: '14px', fontWeight: '500' }}>Name *</span>
                <TextField.Root
                  placeholder="Enter member name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Flex>
            </label>

            <label>
              <Flex direction="column" gap="1">
                <span style={{ fontSize: '14px', fontWeight: '500' }}>Email *</span>
                <TextField.Root
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Flex>
            </label>

            <label>
              <Flex direction="column" gap="1">
                <span style={{ fontSize: '14px', fontWeight: '500' }}>Role *</span>
                <Select.Root value={role} onValueChange={setRole}>
                  <Select.Trigger />
                  <Select.Content>
                    <Select.Item value={MEMBER_ROLES.SECRETARY}>Secretary</Select.Item>
                    <Select.Item value={MEMBER_ROLES.JOINT_SECRETARY}>Joint Secretary</Select.Item>
                    <Select.Item value={MEMBER_ROLES.MEMBER}>Member</Select.Item>
                  </Select.Content>
                </Select.Root>
              </Flex>
            </label>

            <label>
              <Flex direction="column" gap="1">
                <span style={{ fontSize: '14px', fontWeight: '500' }}>Club (Optional)</span>
                <Select.Root value={clubId} onValueChange={setClubId}>
                  <Select.Trigger placeholder="Select club" />
                  <Select.Content>
                    <Select.Item value="">No Club</Select.Item>
                    {clubs?.map(club => (
                      <Select.Item key={club.id} value={club.id.toString()}>
                        {club.name}
                      </Select.Item>
                    ))}
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
              <Button type="submit" disabled={loading}>
                {loading ? 'Adding...' : 'Add Member'}
              </Button>
            </Flex>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};
