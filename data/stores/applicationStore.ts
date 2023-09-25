import { getCurrentDateTime } from '@/utils/day';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';



export const useApplicationStore = create(
  devtools((set, get) => ({
    allApplications: [],
    pageType : '',
    setPageType : (page : string) => { 
      set({pageType : page})
    },
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
      // const currentPageType = get().pageType;
      // Вызываем fetchAllApplications после добавления нового поста
      get().fetchAllApplications(`/api/${get().pageType}/`);
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
      get().fetchAllApplications(`/api/${get().pageType}/`);
    },
  })),
);
