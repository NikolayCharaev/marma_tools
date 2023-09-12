import applicationBg from '@/public/applications-bg.jpeg';
import consumablesBg from '@/public/consumables-bg.jpeg';
import leftoverssBg from '@/public/leftovers-bg.jpeg';

export const navData = [
    {
      path: './pages/consumables',
      imageUrl: consumablesBg,
      title: 'Обновить количество расходников',
      description: 'Просмотр и обновление списка расходных материалов',
    },
    {
      path: './pages/leftovers',
      imageUrl: leftoverssBg,
      title: 'Наличие остатков камня в цеху',
      description: 'Просмотр таблицы остатков камня в цеху',
    },
    {
      path: './pages/applications',
      imageUrl: applicationBg,
      title: 'Оставить заявку на покупку инструментов',
      description: 'Управление заявками на покупку инструментов',
    },
  ];