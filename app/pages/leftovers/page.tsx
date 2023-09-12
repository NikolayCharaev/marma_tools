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
  const fetchNewStone = async () => {
    await fetch('/api/stones', {
      method: 'POST',
      body: JSON.stringify({
        stoneType: 'новый камень',
        width: 100,
        height: 100,
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd7tDyrITc4TQQl8XQvQT3R_j5DtSwMExDtRnQZg5-K-BZy_mP6n0sxsw4YWdqiCVIuqQ&usqp=CAU',
        selectedRow,
        selectedSide,
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
  const [allStones, setAllStones] = useState([]);

  useEffect(() => {
    fetchAllStones();
  }, []);
  return (
    <>
      <Title style="mb-10">Остатки камня</Title>
      {/* <div>
        <label>Выберите ряд:</label>
        <select value={selectedRow} onChange={(e) => setSelectedRow(e.target.value)}>
          <option value="">Выберите ряд</option>
          <option value="rowOne">Ряд 1</option>
          <option value="rowTwo">Ряд 2</option>
          <option value="rowThree">Ряд 3</option>
          <option value="rowFour">Ряд 4</option>
          <option value="rowFive">Ряд 5</option>
        </select>
      </div>
      <div>
        <label>Выберите сторону:</label>
        <select value={selectedSide} onChange={(e) => setSelectedSide(e.target.value)}>
          <option value="">Выберите сторону</option>
          <option value="left">Левая сторона</option>
          <option value="right">Правая сторона</option>
        </select>
      </div>
      <button onClick={fetchNewStone}>Добавить камень</button> */}

      <div className=" gap-5 grid grid-cols-5 justify-center">
        {allStones?.slice(0, 5).map((elem, index) => {
          const imageBg = images[index];
          return (
            <>
              <LeftoversCard card={elem} imageBg={imageBg} key={index} index={index + 1} />
            </>
          );
        })}
      </div>
    </>
  );
};

export default Leftovers;
