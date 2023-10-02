'use client';

import { useEffect, useState } from 'react';
import Title from '@/app/components/Title';
import rowOneBg from '@/public/leftovers/row-1.jpg';
import rowTwoBg from '@/public/leftovers/row-2.jpg';
import rowThreeBg from '@/public/leftovers/row-3.jpg';
import rowFourBg from '@/public/leftovers/row-4.jpg';
import rowFiveBg from '@/public/leftovers/row-5.jpg';
import LeftoversCard from '@/app/components/LeftoversCard';

const images = [rowOneBg, rowTwoBg, rowThreeBg, rowFourBg, rowFiveBg];
import { toast } from 'react-toastify';
import { useStoneStore } from '@/data/stores/useStoneStore';
import SearchStone from '@/app/components/SearchStone';
import { IStone } from '@/types/tools';

const Leftovers = () => {
  const { allStones, setAllStones, fetchAllStones } = useStoneStore((state: any) => state);

  useEffect(() => {
    fetchAllStones('/api/stones');
  }, [fetchAllStones]);
  return (
    <>
      <div className="flex justify-between items-center mb-10 sm:justify-end">
        <Title style="sm:hidden">Остатки камня</Title>
        <SearchStone />
      </div>

      <div className="flex 3xl:flex-wrap sm:justify-center gap-5 mb-10">
        {allStones?.map((elem:any, index: number) => {
          const imageBg = images[index];
          return (
            <div key={index}>
              {/* @ts-ignore */}
              <LeftoversCard card={allStones[index]} imageBg={imageBg} index={index + 1} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Leftovers;
