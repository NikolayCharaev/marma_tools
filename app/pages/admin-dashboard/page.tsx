'use client';
import { useState, useEffect } from 'react';
import Title from '@/app/components/Title';
import CustomButton from '@/app/components/CustomButton';
import { getCurrentDateTime } from '@/utils/day';
import { useStoneStore } from '@/data/stores/useStoneStore';
import { Typography } from '@material-tailwind/react';
import { IStone } from '@/types/tools';
import StoneCard from '@/app/components/StoneCard';

const AdminDashboard = () => {
  const { stonesToday, setStonesToday, fetchAllStones } = useStoneStore((state: any) => state);

  async function getStonesInfo() {
    await fetchAllStones('/api/stones');
    await setStonesToday(getCurrentDateTime().slice(0, 8));
  }

  useEffect(() => {
    getStonesInfo();
  }, []);
  return (
    <div>
      <div className="">
        <Title style="mb-5">
          Список изменений в пирамиде за сегодня ({getCurrentDateTime().slice(0, 8)})
        </Title>
        {!stonesToday.length && (
          <Typography className="mt-5" variant="h1">
            Сегодня новых камней в пирамиде нет
          </Typography>
        )}

        <div className="flex overflow-x-scroll  gap-5 w-full">
          {stonesToday.map((elem: IStone, index: number) => {
            return (
              <div className="max-w-[400px] flex-none" key={elem._id}>
                <StoneCard item={elem} isSearch={true} index={index} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
