// User roles
export const USER_ROLES = {
  ADMIN: 'admin',
  MEMBER: 'member'
};

// Member roles in clubs
export const MEMBER_ROLES = {
  SECRETARY: 'Secretary',
  JOINT_SECRETARY: 'Joint Secretary',
  MEMBER: 'Member'
};

// Activity types
export const ACTIVITY_TYPES = {
  SEMINAR: 'seminar',
  WORKSHOP: 'workshop'
};

// Activity scopes
export const ACTIVITY_SCOPES = {
  EXTERNAL: 'external',
  INTERNAL: 'internal'
};

// Club head roles
export const CLUB_HEAD_ROLES = [
  'President',
  'Vice President',
  'Design Head',
  'Tech Head',
  'Event Head',
  'Marketing Head',
  'Content Head',
  'Finance Head'
];

// API base URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// App name
export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Club Management System';

// Date format
export const DATE_FORMAT = 'MMM dd, yyyy';
export const TIME_FORMAT = 'h:mm a';
export const DATETIME_FORMAT = 'MMM dd, yyyy h:mm a';
