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

const Leftovers = () => {
  const [selectedRow, setSelectedRow] = useState('');
  const [selectedSide, setSelectedSide] = useState('');
  const [updatePosts, setUpdatePosts] = useState<boolean>(false);

  const [allStones, setAllStones] = useState([]);

  const handlePostsUpdate = (prop: boolean) => {
    setUpdatePosts(prop);
  };

  const fetchNewStone = async () => {
    await fetch('/api/stones', {
      method: 'POST',
      body: JSON.stringify({
        stoneType: 'новый камень',
        width: 100,
        height: 100,
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd7tDyrITc4TQQl8XQvQT3R_j5DtSwMExDtRnQZg5-K-BZy_mP6n0sxsw4YWdqiCVIuqQ&usqp=CAU',
        selectedRow : 'rowTwo',
        selectedSide : "right",
      }),
    });
    fetchAllStones();
  };
  const fetchAllStones = async () => {
    const response = await fetch('/api/stones', {
      method: 'GET',
    });
    const stones = await response.json();
    setAllStones(Object.values(stones[0]));
  };

  useEffect(() => {
    // fetchNewStone();
    fetchAllStones();
  }, [updatePosts]);

  console.log(allStones)
  return (
    <>
      <Title style="mb-10">Остатки камня</Title>
      <div className=" gap-5 grid grid-cols-5 justify-center">
        {allStones?.slice(0, 5).map((elem, index) => {
          const imageBg = images[index];
          return (
            <div key={index}>
              <LeftoversCard
                handlePostsUpdate={handlePostsUpdate}
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
