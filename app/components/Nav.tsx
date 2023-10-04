'use client'
import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import CustomButton from './CustomButton';
import {  Typography } from '@material-tailwind/react';



const Nav = () => {
  return (
    <nav className="container mx-auto py-4 flex justify-between items-center mb-10">
      <Link href="/" className='relative'>
        <Image
          src="https://marmagroup.ru/local/templates/marma_custom_page/svg/logo.svg"
          alt="logo"
          width={187}
          height={72}
          className='sm:max-w-[130px]'
        />
  
<Typography className='uppercase text-[#393E4F] font-bold text-2xl p-1 bg-[#FEFCFD] absolute top-0 right-0 sm:text-base'>marma <br/> tools</Typography>
      </Link>
      <Link href="../pages/admin-dashboard">
        <CustomButton>панель администрации</CustomButton>
      </Link>
    </nav>
  );
};

export default Nav;
