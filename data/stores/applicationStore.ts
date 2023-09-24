import { getCurrentDateTime } from '@/utils/day';
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
    fetchPostApplication: async (pond: string, post) => {
      await fetch(pond, {
        method: 'POST',
        body: JSON.stringify({
          applicationName: post.applicationName,
          more: post.more,
          imageUrl: post.imageUrl,
          date: post.date,
        }),
      });
      // Вызываем fetchAllApplications после добавления нового поста
      get().fetchAllApplications('/api/applications/');
    },
    fetchPatchApplication: async (pond: string, post, postId) => {
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
      // Вызываем fetchAllApplications после изменения поста
      get().fetchAllApplications('/api/applications/');
    },
  })),
);
