import { format, parseISO } from 'date-fns';
import { DATE_FORMAT, TIME_FORMAT } from './constants';

// Format date string
export const formatDate = (dateString) => {
  if (!dateString) return '';
  try {
    return format(parseISO(dateString), DATE_FORMAT);
  } catch (error) {
    return dateString;
  }
};

// Format time string
export const formatTime = (timeString) => {
  if (!timeString) return '';
  try {
    // Handle HH:mm:ss format
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours), parseInt(minutes));
    return format(date, TIME_FORMAT);
  } catch (error) {
    return timeString;
  }
};

// Calculate budget remaining
export const calculateBudgetRemaining = (allocated, spent) => {
  return (parseFloat(allocated) || 0) - (parseFloat(spent) || 0);
};

// Calculate budget utilization percentage
export const calculateBudgetUtilization = (allocated, spent) => {
  const allocatedAmount = parseFloat(allocated) || 0;
  const spentAmount = parseFloat(spent) || 0;
  if (allocatedAmount === 0) return 0;
  return Math.min((spentAmount / allocatedAmount) * 100, 100);
};

// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount || 0);
};

// Truncate text
export const truncateText = (text, maxLength = 100) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Get initials from name
export const getInitials = (name) => {
  if (!name) return '';
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};
