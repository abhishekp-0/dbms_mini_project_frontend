import { useState } from 'react';
import { Box, Flex } from '@radix-ui/themes';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';

export const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Flex direction="column" style={{ minHeight: '100vh' }}>
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Flex style={{ flex: 1 }}>
        <Sidebar isOpen={sidebarOpen} />
        <Box style={{ flex: 1, padding: '24px', overflow: 'auto' }}>
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};
