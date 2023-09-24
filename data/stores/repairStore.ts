import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useRepairStore = create(
  devtools((set, get) => ({
    allRepairs: [],
    fetchAllRepairs: async (pond: string) => {
      const response = await fetch(pond);
      const repairs = await response.json();
      set({ allRepairs: repairs });
    },
  })),
);
