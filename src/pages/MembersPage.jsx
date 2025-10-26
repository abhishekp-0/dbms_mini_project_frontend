import { useState } from 'react';
import { Flex, Heading, Button, Grid } from '@radix-ui/themes';
import { Plus } from 'lucide-react';
import { MemberCard } from '../components/members/MemberCard';
import { MemberForm } from '../components/members/MemberForm';
import { SearchBar } from '../components/common/SearchBar';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { useFetch } from '../hooks/useFetch';
import { useDebounce } from '../hooks/useDebounce';
import { memberService } from '../services/memberService';
import { clubService } from '../services/clubService';

export const MembersPage = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);

  const { data: members, loading, error, refetch } = useFetch(() => memberService.getMembers());
  const { data: clubs } = useFetch(() => clubService.getClubs());

  const handleCreateMember = async (memberData) => {
    await memberService.createMember(memberData);
    refetch();
  };

  // Filter members by search
  const filteredMembers = members?.filter(member =>
    member.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    member.email.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  if (loading) {
    return <LoadingSpinner message="Loading members..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  return (
    <Flex direction="column" gap="6">
      <Flex justify="between" align="center">
        <Heading size="8">Members</Heading>
        <Button onClick={() => setFormOpen(true)}>
          <Plus size={16} /> Add Member
        </Button>
      </Flex>

      <SearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search members by name or email..."
      />

      <Grid columns={{ initial: '1', sm: '2', md: '3' }} gap="4">
        {filteredMembers?.map(member => (
          <MemberCard key={member.id} member={member} clubs={clubs} />
        ))}
      </Grid>

      <MemberForm
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleCreateMember}
        clubs={clubs}
      />
    </Flex>
  );
};
