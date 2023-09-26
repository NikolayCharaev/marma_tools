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

import { useStoneStore } from '@/data/stores/useStoneStore';

const Leftovers = () => {
  const { allStones, setAllStones, fetchAllStones } = useStoneStore((state) => state);

  useEffect(() => {
    fetchAllStones('/api/stones');
  }, []);

  return (
    <>
      <Title style="mb-10">Остатки камня</Title>
     
      <div className="flex 3xl:flex-wrap sm:justify-center gap-5 ">
        {allStones?.slice(0, 5).map((elem, index) => {
          const imageBg = images[index];
          return (
            <div key={index}>
              <LeftoversCard
                card={elem}
                imageBg={imageBg}
                index={index + 1}
              />

            </div>
          );
        })}
      </div>
    </>
  );
};

export default Leftovers;
