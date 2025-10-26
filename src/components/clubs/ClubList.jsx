import { Grid, Flex, Text } from '@radix-ui/themes';
import { ClubCard } from './ClubCard';

export const ClubList = ({ clubs, onClubClick }) => {
  if (!clubs || clubs.length === 0) {
    return (
      <Flex align="center" justify="center" py="9">
        <Text size="3" color="gray">
          No clubs found
        </Text>
      </Flex>
    );
  }

  return (
    <Grid columns={{ initial: '1', sm: '2', md: '3' }} gap="4">
      {clubs.map((club) => (
        <ClubCard key={club.id} club={club} onClick={() => onClubClick(club)} />
      ))}
    </Grid>
  );
};
