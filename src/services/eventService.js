import api from './api';

export const eventService = {
  // Get all events
  getEvents: async () => {
    const response = await api.get('/events');
    return response.data;
  },
  
  // Create a new event
  createEvent: async (eventData) => {
    const response = await api.post('/events', eventData);
    return response.data;
  }
};
