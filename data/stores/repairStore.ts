import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { getCurrentDateTime } from '@/utils/day';

export const useRepairStore = create(
  devtools((set, get) => ({
    allRepairs: [],
    fetchAllRepairs: async (pond: string) => {
      const response = await fetch(pond);
      const repairs = await response.json();
      set({ allRepairs: repairs });
    },
    fetchPostRepair: async (pond: string, post) => {
      await fetch(pond, {
        method: 'POST',
        body: JSON.stringify({
          applicationName: post.applicationName,
          more: post.more,
          imageUrl: post.imageUrl,
          date: post.date,
        }),
      });
      // Вызываем fetchAllRepairs после добавления нового поста
      get().fetchAllRepairs('/api/repairs/');
    },
    fetchPatchRepair: async (pond: string, post, postId) => {
      await fetch(pond, {
        method: 'PATCH',
        body: JSON.stringify({
          applicationName: post.applicationName,
          more: post.more,
          imageUrl: post.imageUrl,
          date: getCurrentDateTime(),
          id: postId,
        }),
      });
      // Вызываем fetchAllRepairs после изменения поста
      get().fetchAllRepairs('/api/repairs/');
    },
  })),
);