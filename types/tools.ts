import { StaticImageData } from 'next/image';

export type NavDataProps = {
  path?: string;
  title: string;
  imageUrl: StaticImageData;
  description?: string;
};

