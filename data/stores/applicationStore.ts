import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useApplicationStore = create(
  devtools((set, get) => ({
    allApplications: [],
    fetchAllApplications: async (pond: string) => {
      const response = await fetch(pond);
      const applications = await response.json();
      set({ allApplications: applications });
    },
  })),
);
