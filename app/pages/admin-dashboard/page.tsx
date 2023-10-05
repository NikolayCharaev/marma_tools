'use client';
import { useState, useEffect } from 'react';
import Title from '@/app/components/Title';
import CustomButton from '@/app/components/CustomButton';
import { getCurrentDateTime } from '@/utils/day';
import { useStoneStore } from '@/data/stores/useStoneStore';
import { useApplicationStore } from '@/data/stores/applicationStore';
import { Typography } from '@material-tailwind/react';
import { IApplication, IStone } from '@/types/tools';
import StoneCard from '@/app/components/StoneCard';
import ApplicationsCard from '@/app/components/ApplicationsCard';

const AdminDashboard = () => {
  const { stonesToday, setStonesToday, fetchAllStones } = useStoneStore((state: any) => state);
  const { fetchAllApplications, allApplications } = useApplicationStore((state: any) => state);

  async function getStonesInfo() {
    await fetchAllStones('/api/stones');
    await setStonesToday(getCurrentDateTime().slice(0, 8));
    await fetchAllApplications('/api/applications');
  }

  useEffect(() => {
    getStonesInfo();
  }, []);
  return (
    <div>
      <div className="">
        <Title style="mb-5">
          Список новых камней в пирамиде за сегодня ({getCurrentDateTime().slice(0, 8)})
        </Title>
        {!stonesToday.length && (
          <Typography className="mt-5" variant="h1">
            Сегодня новых камней в пирамиде нет
          </Typography>
        )}

        <div className="flex overflow-x-scroll  gap-5 w-full mb-5">
          {stonesToday.map((elem: IStone, index: number) => {
            return (
              <div className="max-w-[400px]  flex-none" key={elem._id}>
                <StoneCard item={elem} isSearch={true} index={index} />
              </div>
            );
          })}
        </div>

        <div className="mb-10 ">
          <Title style="mb-5">Заявки на расходуемые материалы</Title>
          <div className="flex overflow-x-scroll  gap-5 w-full mb-5">
            {allApplications.map((elem: IApplication) => {
              return (
                <div className="w-[400px] flex-none mb-5" key={elem._id}>
                  <ApplicationsCard post={elem} isAdmin={true} />
                </div>
              );
            })}
          </div>
          <CustomButton>загрузить список</CustomButton>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
