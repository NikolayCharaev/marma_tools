import { StaticImageData } from 'next/image';

export type NavDataProps = {
  path?: string;
  title: string;
  imageUrl: StaticImageData;
  description?: string;
};

export type IStone = {
  _id?: string;
  stoneType: string;
  selectedRow?: number;
  height: number | string;
  width: number | string;
  imageUrl: null | File;
  thickness: string; // толщина камня
  date?: string;
};

// applications types

export type IApplication = {
  applicationName: string;
  more: string;
  imageUrl: string;
  date: string;
  _id: string;
};
