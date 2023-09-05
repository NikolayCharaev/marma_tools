import React, { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CustomButton from './CustomButton';

import { NavDataProps } from '@/types/tools';

type CardProps = {
  elem: NavDataProps;
};

const Card: FC<CardProps> = ({ elem }) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-900 dark:border-gray-700 hover:translate-y-[-10px] transition ">
      <Link href={elem?.path}>
        <div className="">
          <Image
            width={500}
            height={500}
            className="rounded-t-lg aspect-square object-cover"
            src={elem?.imageUrl}
            alt="post-image"
          />
        </div>
        <div className="p-5">
          <div>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {elem?.title}
            </h5>
          </div>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{elem?.description}</p>
          <Link href={elem?.path} className="">
            <CustomButton className="w-1/3 flex items-center ">
              перейти
              <svg
                className="w-3.5 h-3.5 ml-2 text-center"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10">
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </CustomButton>
          </Link>
        </div>
      </Link>
    </div>
  );
};

export default Card;
