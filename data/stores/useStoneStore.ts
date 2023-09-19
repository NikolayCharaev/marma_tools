import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useStoneStore = create(
  devtools((set, get) => ({
    allStones: [],
    fetchAllStones: async (pond : string) => {
      const response = await fetch(pond);
      const stones = await response.json();
      const values = Object.values(stones[0]);
      set({ allStones: values });
    },
    oneStone: {},
    updateStone: {},

    // setAllStones: (stones) => set({ allStones: stones }),
    setOneStone: (stone) => set({ oneStone: stone }),
    setUpdateStone: (stone) => set({ updateStone: stone }),
    removeAllBears: () => set({ bears: 0 }),
  })),
);
