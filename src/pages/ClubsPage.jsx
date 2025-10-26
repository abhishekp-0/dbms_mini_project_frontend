import { useState } from 'react';
import { Flex, Heading, Button } from '@radix-ui/themes';
import { Plus } from 'lucide-react';
import { ClubList } from '../components/clubs/ClubList';
import { ClubForm } from '../components/clubs/ClubForm';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ErrorMessage } from '../components/common/ErrorMessage';
import { useFetch } from '../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import { clubService } from '../services/clubService';

export const ClubsPage = () => {
  const navigate = useNavigate();
  const [formOpen, setFormOpen] = useState(false);
  
  const { data: clubs, loading, error, refetch } = useFetch(() => clubService.getClubs());

  const handleCreateClub = async (clubData) => {
    await clubService.createClub(clubData);
    refetch();
  };

  const handleClubClick = (club) => {
    navigate(`/clubs/${club.id}`);
  };

  if (loading) {
    return <LoadingSpinner message="Loading clubs..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  return (
    <Flex direction="column" gap="6">
      <Flex justify="between" align="center">
        <Heading size="8">Clubs</Heading>
        <Button onClick={() => setFormOpen(true)}>
          <Plus size={16} /> Create Club
        </Button>
      </Flex>

      <ClubList clubs={clubs} onClubClick={handleClubClick} />

      <ClubForm
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleCreateClub}
      />
    </Flex>
  );
};
