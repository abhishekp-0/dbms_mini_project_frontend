import api from './api';

export const budgetService = {
  // Get all budgets
  getBudgets: async () => {
    const response = await api.get('/budgets');
    return response.data;
  },
  
  // Create a new budget
  createBudget: async (budgetData) => {
    const response = await api.post('/budgets', budgetData);
    return response.data;
  }
};
