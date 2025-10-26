import { Flex, Box, Text, Button } from '@radix-ui/themes';
import { Menu } from 'lucide-react';
import { APP_NAME } from '../../utils/constants';

export const Navbar = ({ onToggleSidebar }) => {
  return (
    <Box
      style={{
        borderBottom: '1px solid var(--gray-5)',
        backgroundColor: 'var(--color-background)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}
    >
      <Flex justify="between" align="center" px="4" py="3">
        <Flex align="center" gap="3">
          <Button
            variant="ghost"
            size="2"
            onClick={onToggleSidebar}
            style={{ cursor: 'pointer' }}
          >
            <Menu size={18} />
          </Button>
          <Text size="5" weight="bold">
            {APP_NAME}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};
