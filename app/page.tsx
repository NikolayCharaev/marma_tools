'use client';
import { useEffect } from 'react';
import { NavDataProps } from '../types/tools';
import Card from './components/Card';
import Title from './components/Title';
import { navData } from '@/data/navData';
import { useStoneStore } from '@/data/stores/useStoneStore';

export default function Home() {
  const { fetchAllStones } = useStoneStore(
    (state: any) => state,
  );

  useEffect(() => {
    fetchAllStones('/api/stones');
  }, [fetchAllStones]);
  return (
    <div className="">
      <Title style="mb-10 ">Выберите категорию</Title>
      <div className="grid grid-cols-3 justify-center lg:grid-cols-2 mt:grid-cols-1 mt:mb-10 gap-10 ">
        {navData.map((elem: NavDataProps, index: number) => {
          const { path, imageUrl, title, description } = elem;
          return (
            <Card
              path={path}
              imageUrl={imageUrl}
              title={title}
              description={description}
              buttonText={'перейти'}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}
