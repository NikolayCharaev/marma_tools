import { IStone } from '@/types/tools';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useStoneStore = create(
  devtools((set: any, get: any) => ({
    allStones: [],
    fetchAllStones: async (pond: string) => {
      const response = await fetch(pond);
      const stones = await response.json();
      const values = Object.values(stones[0]);
      set({ allStones: values });
    },
    oneStone: {},
    updateStone: {},

    // setAllStones: (stones) => set({ allStones: stones }),
    setOneStone: (stone : IStone) => set({ oneStone: stone }),
    setUpdateStone: (stone : IStone) => set({ updateStone: stone }),
    removeAllBears: () => set({ bears: 0 }),
  })),
);
