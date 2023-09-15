'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const CardMini = ({ title, imageUrl }) => {
  const [count, setCount] = useState(0);

  return (
    <div className="text-white flex flex-col gap-3 p-2 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-900 dark:border-gray-700 pb-10">
      <div className="overflow-hidden w-full h-52">
        <Image
          width={250}
          height={200}
          src={imageUrl}
          alt="poster"
          className="scale-150 translate-y-[-70px]"
        />
      </div>

      <div className="flex items-center justify-center gap-8 mt-4">
        <button className="border border-white p-2 rounded-xl active:bg-green-500 px-4">-</button>
        <p>{count}</p>

        <button
          className="border border-white p-2 rounded-xl active:bg-green-500 px-4"
          onClick={() => {
            setCount(count + 1);
          }}>
          +
        </button>
      </div>
    </div>
  );
};

export default CardMini;
