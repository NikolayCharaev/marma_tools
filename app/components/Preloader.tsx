import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Preloader = () => {
  return (
    <div className="flex justify-center items center ">
      <div className="flex flex-col gap-4 justify-center items-center z-10 text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl p-3 rounded-2xl absolute transition w-[400px] top-[50px] ">
        <AiOutlineLoading3Quarters className="animate-spin rounded-full" size={40} />
        <p className="text-center">Идет загрузка поста...</p>
      </div>
    </div>
  );
};

export default Preloader;
