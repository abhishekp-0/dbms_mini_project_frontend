import api from './api';

export const memberService = {
  // Get all members
  getMembers: async () => {
    const response = await api.get('/members');
    return response.data;
  },
  
  // Create a new member
  createMember: async (memberData) => {
    const response = await api.post('/members', memberData);
    return response.data;
  }
};
