import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { getCurrentDateTime } from '@/utils/day';
import { IApplication } from '@/types/tools';
import { toast } from 'react-toastify';

export const useRepairStore = create(
  devtools((set: any, get: any) => ({
    allRepairs: [],
    fetchAllRepairs: async (pond: string) => {
      const response = await fetch(pond);
      const repairs = await response.json();
      set({ allRepairs: repairs });
    },
    fetchPostRepair: async (pond: string, post: IApplication) => {
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
      // Вызываем fetchAllRepairs после добавления нового поста

      // @ts-ignore
      get().fetchAllRepairs('/api/repairs/');
    },
    fetchPatchRepair: async (pond: string, post: IApplication, postId: string) => {
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
      // @ts-ignore
      get().fetchAllRepairs('/api/repairs/');
    },
  })),
);
