import { Box, Flex, Text } from '@radix-ui/themes';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  User,
  Calendar,
  CreditCard,
  Rocket
} from 'lucide-react';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/clubs', icon: Users, label: 'Clubs' },
  { to: '/members', icon: User, label: 'Members' },
  { to: '/events', icon: Calendar, label: 'Events' },
  { to: '/budgets', icon: CreditCard, label: 'Budgets' },
  { to: '/activities', icon: Rocket, label: 'Activities' }
];

export const Sidebar = ({ isOpen }) => {
  return (
    <Box
      style={{
        width: isOpen ? '250px' : '0',
        minWidth: isOpen ? '250px' : '0',
        borderRight: isOpen ? '1px solid var(--gray-5)' : 'none',
        backgroundColor: 'var(--color-background)',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        height: 'calc(100vh - 57px)',
        position: 'sticky',
        top: '57px'
      }}
    >
      <Flex direction="column" gap="2" p="3">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            style={({ isActive }) => ({
              textDecoration: 'none',
              borderRadius: 'var(--radius-2)',
              padding: '8px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              backgroundColor: isActive ? 'var(--accent-3)' : 'transparent',
              color: isActive ? 'var(--accent-11)' : 'var(--gray-12)',
              fontWeight: isActive ? '500' : '400',
              transition: 'background-color 0.2s'
            })}
          >
            <item.icon size={18} />
            <Text size="2">{item.label}</Text>
          </NavLink>
        ))}
      </Flex>
    </Box>
  );
};
