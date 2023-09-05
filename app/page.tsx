import Image from 'next/image';
import Link from 'next/link';

import { NavDataProps } from '../types/tools';
import CustomButton from './components/CustomButton';
import applicationBg from '@/public/applications-bg.jpeg';
import consumablesBg from '@/public/consumables-bg.jpeg';
import leftoverssBg from '@/public/leftovers-bg.jpeg';
import Card from './components/Card';

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
    title: 'Заявки на покупку инструментов',
    description: 'Просмотр и управление заявками на покупку инструментов',
  },
];

export default function Home() {
  return (
    <div className="">
      <h1 className="text-left text-2xl mb-10 ">Выберите категорию</h1>
      <div className="flex items-center flex-wrap justify-center gap-10 mb-10">
        {navData.map((elem: NavDataProps, index: number) => {
          return <Card elem={elem} key={index} />;
        })}
      </div>
    </div>
  );
}
