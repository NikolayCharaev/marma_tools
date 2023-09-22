import applicationBg from '@/public/applications-bg.jpeg';
import consumablesBg from '@/public/consumables-bg.jpeg';
import leftoverssBg from '@/public/leftovers-bg.jpeg';

import repairBg from '@/public/repair-bg.jpg';
export const navData = [
    // {
    //   path: './pages/consumables',
    //   imageUrl: consumablesBg,
    //   title: 'Обновить количество расходников',
    //   description: 'Просмотр и обновление списка расходных материалов',
    // },
    {
      path: './pages/leftovers',
      imageUrl: leftoverssBg,
      title: 'Наличие остатков камня в цеху',
      description: 'Просмотр таблицы остатков камня в цеху',
    },
    {
      path: './pages/applications',
      imageUrl: applicationBg,
      title: 'Оставить заявку на покупку расходников',
      description: 'Управление заявками на расходных материалов',
    },
    {
      path: './pages/repair',
      imageUrl: repairBg,
      title: 'Оставить заявку в случае поломки инструмента',
      description: 'Управление заявками для ремонта инструментов',
    },
  ];