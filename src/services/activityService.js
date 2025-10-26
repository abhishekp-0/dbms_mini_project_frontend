import api from './api';

export const activityService = {
  // Get all activities
  getActivities: async () => {
    const response = await api.get('/activities');
    return response.data;
  },
  
  // Get single activity
  getActivity: async (id) => {
    const response = await api.get(`/activities/${id}`);
    return response.data;
  },
  
  // Create a new activity
  createActivity: async (activityData) => {
    const response = await api.post('/activities', activityData);
    return response.data;
  },
  
  // Update an activity
  updateActivity: async (id, activityData) => {
    const response = await api.put(`/activities/${id}`, activityData);
    return response.data;
  },
  
  // Delete an activity
  deleteActivity: async (id) => {
    const response = await api.delete(`/activities/${id}`);
    return response.data;
  }
};
