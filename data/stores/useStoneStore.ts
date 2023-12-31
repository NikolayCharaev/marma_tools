import { IStone } from '@/types/tools';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export const useStoneStore = create(
  devtools((set: any, get: any) => ({
    allStones: [],
    fetchAllStones: async (pond: string) => {
      const response = await fetch(pond);
      const stones = await response.json();
      // const values = Object.values(stones[0]);
      set({ allStones: stones[0].rows });
    },
    oneStone: {},
    updateStone: {},
    searchStone: [],
    stonesToday: [],

    // setAllStones: (stones) => set({ allStones: stones }),
    setOneStone: (stone: IStone) => set({ oneStone: stone }),
    setUpdateStone: (stone: IStone) => set({ updateStone: stone }),
    setSearchStone: (params: string) =>
      set({
        searchStone: get()
          .allStones.flat()
          .filter((elem: IStone) => {
            return elem.stoneType.toLowerCase().trim() === params.toLowerCase().trim();
          }),
      }),
    setStonesToday: (params: string) =>
      set({
        stonesToday: get()
          .allStones.flat()
          .filter((elem: IStone) => {
            return elem?.date?.slice(0, 8) === params.slice(0, 8);
          }),
      }),
    setClearStone: () => {
      set({ searchStone: [] });
    },
  })),
);
