import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import CustomButton from './CustomButton';



const Nav = () => {
  return (
    <nav className="container mx-auto py-4 flex justify-between items-center mb-10">
      <Link href="/">
        <Image
          src="https://marmagroup.ru/local/templates/marma_custom_page/svg/logo.svg"
          alt="logo"
          width={187}
          height={72}
        />
      </Link>
      <Link href="../pages/admin-dashboard">
        <CustomButton>панель администрации</CustomButton>
      </Link>
    </nav>
  );
};

export default Nav;
