import { StaticImageData } from 'next/image';

export type NavDataProps = {
  path?: string;
  title: string;
  imageUrl: StaticImageData;
  description?: string;
};



export type IStone = { 
  _id? : string,
  stoneType: string,
  height: number,
  width: number,
  imageUrl: null | File,
  thickness: string, // толщина камня
}