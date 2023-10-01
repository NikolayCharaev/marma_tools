import { IApplication } from '@/types/tools';
import { getCurrentDateTime } from '@/utils/day';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { toast } from 'react-toastify';

export const useApplicationStore = create(
  devtools((set: any, get: any) => ({
    allApplications: [],
    pageType: '',
    setPageType: (page: string) => {
      set({ pageType: page });
    },
    fetchAllApplications: async (pond: string) => {
      const response = await fetch(pond);
      const applications = await response.json();
      set({ allApplications: applications });
    },
    fetchPostApplication: async (pond: string, post: IApplication) => {
      await toast.promise(
        fetch(pond, {
          method: 'POST',
          body: JSON.stringify({
            applicationName: post.applicationName,
            more: post.more,
            imageUrl: post.imageUrl,
            date: post.date,
          }),
        }),
        {
          pending: 'Загрузка заявки',
          success: 'Заявка загружена 👌',
          error: 'Ошибка  🤯',
        },
      );
      // Вызываем fetchAllApplications после добавления нового поста

      // @ts-ignore
      get().fetchAllApplications(`/api/${get().pageType}/`);
    },
    fetchPatchApplication: async (pond: string, post: IApplication, postId: string) => {
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
      // @ts-ignore
      get().fetchAllApplications(`/api/${get().pageType}/`);
    },
  })),
);
