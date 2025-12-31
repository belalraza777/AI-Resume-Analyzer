import { create } from 'zustand';
import api from '../api/api';

// Single source of truth for report data and async status flags
const initialState = {
  reports: [], // fetched reports list
  loading: false, // true while fetching all reports
  error: '', // last error message
  actionId: '', // resumeId currently being acted upon (analyze/delete)
  actionType: '', // 'analyze' | 'delete'
};

const useReportsStore = create((set, get) => ({
  ...initialState,

  // Load all reports from the backend
  fetchReports: async () => {
    set({ loading: true, error: '' });
    try {
      const { data } = await api.get('/analyze/report');
      set({ reports: data.data || [], loading: false, actionId: '', actionType: '' });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Failed to load reports', loading: false, actionId: '', actionType: '' });
    }
  },

  // Re-run analysis for a specific resume
  analyzeReport: async id => {
    set({ actionId: id, actionType: 'analyze' });
    try {
      const { data } = await api.post(`/analyze/report/${id}`);
      await get().fetchReports();
      set({ actionId: '', actionType: '' });
      return data;
    } catch (err) {
      set({ error: err.response?.data?.message || 'Analyze failed', actionId: '', actionType: '' });
      return null;
    }
  },

  // Delete a report/resume by id
  deleteReport: async id => {
    set({ actionId: id, actionType: 'delete' });
    try {
      await api.delete(`/analyze/report/${id}`);
      await get().fetchReports();
      set({ actionId: '', actionType: '' });
    } catch (err) {
      set({ error: err.response?.data?.message || 'Delete failed', actionId: '', actionType: '' });
    }
  },

  // Reset error state (useful after user acknowledgment)
  clearError: () => set({ error: '' }),
}));

export default useReportsStore;
