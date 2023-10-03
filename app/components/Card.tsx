import React from 'react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

import CustomButton from './CustomButton';

type CardProps = {
  path?: string | null;
  title?: string | null;
  imageUrl?: StaticImageData;
  description?: string | null;
  buttonText?: string | null;
};

const Card = ({ path, title, imageUrl, description, buttonText }: CardProps) => {
  return (
    <div className="w-full border rounded-lg shadow bg-gray-900 border-gray-700 hover:translate-y-[-10px] transition ">
      <div className="">
        <Image
          width={500}
          height={500}
          className="rounded-t-lg aspect-square object-cover"
          src={imageUrl!}
          alt="post-image"
        />
      </div>
      <div className="p-5">
        <div>
          <h5 className="mb-2 text-xl font-bold tracking-tight  text-white">
            {title!}
          </h5>
        </div>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{description}</p>
        <Link href={path!} className="">
          <CustomButton className="w-1/3 flex items-center ">
            {buttonText!}
            <svg
              className="w-3.5 h-3.5 ml-2 text-center"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </CustomButton>
        </Link>
      </div>
    </div>
  );
};

export default Card;
