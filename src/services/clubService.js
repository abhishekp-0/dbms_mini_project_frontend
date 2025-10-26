import api from './api';

export const clubService = {
  // Get all clubs
  getClubs: async () => {
    const response = await api.get('/clubs');
    return response.data;
  },
  
  // Create a new club
  createClub: async (clubData) => {
    const response = await api.post('/clubs', clubData);
    return response.data;
  },
  
  // Get club heads
  getClubHeads: async (clubId) => {
    const response = await api.get(`/clubs/${clubId}/heads`);
    return response.data;
  },
  
  // Assign club head
  assignClubHead: async (clubId, headData) => {
    const response = await api.post(`/clubs/${clubId}/assign-head`, headData);
    return response.data;
  },
  
  // Get events for a club
  getClubEvents: async (clubId) => {
    const response = await api.get(`/clubs/${clubId}/events`);
    return response.data;
  },
  
  // Get budget for a club
  getClubBudget: async (clubId) => {
    const response = await api.get(`/clubs/${clubId}/budget`);
    return response.data;
  },
  
  // Get activities for a club
  getClubActivities: async (clubId) => {
    const response = await api.get(`/clubs/${clubId}/activities`);
    return response.data;
  }
};
