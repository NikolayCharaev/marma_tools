'use client';
import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Dialog,
  CardFooter,
  DialogBody,
} from '@material-tailwind/react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';

import { useStoneStore } from '@/data/stores/useStoneStore';

import notImage from '@/public/leftovers/not-image.jpg';
import { IStone } from '@/types/tools';
import Image from 'next/image';
import CustomButton from './CustomButton';

type IStoneProps = {
  stoneType: string;
  width: number;
  height: number;
  count: number;
  stone: IStone;
  selectedSide: string;
  selectedRow: string;
  setUpdateForm: (value: boolean) => void;
};

function StoneCard({ stone, selectedSide, selectedRow, setUpdateForm, count }: IStoneProps) {
  const { imageUrl, width, height, stoneType, thickness, _id } = stone;

  const { setOneStone, fetchAllStones } = useStoneStore((state: any) => state);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const handleDelete = async (id: string) => {
    const responce = await fetch('/api/stones/' + id, {
      method: 'DELETE',
      body: JSON.stringify({
        selectedSide: selectedSide,
        selectedRow: selectedRow,
        index: count,
      }),
    });
    if (responce.status === 200) {
      fetchAllStones('/api/stones');
    }
  };

  return (
    <>
      <Card className="max-w-[24rem] md:max-w-[18rem]  overflow-hidden cursor-pointer hover:opacity-90 transition mb-10 mt:w-32">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 rounded-none h-[25rem] sm:h-72 mt:h-32 object-cover"
          onClick={handleOpen}>
          {imageUrl === null ? (
            <Image
              // @ts-ignore
              src={notImage}
              alt="not-image"
              className="object-cover w-full h-full "
            />
          ) : (
            <Image
              // @ts-ignore
              src={imageUrl}
              width={300}
              height={300}
              alt="poster"
              className="object-cover w-full h-full  "
            />
          )}
        </CardHeader>
        <CardBody>
          <Typography variant="h4" color="blue-gray" className="sm:text-lg">
            {stoneType}
          </Typography>
          <Typography
            variant="lead"
            color="gray"
            className="mt-3 font-normal sm:text-sm mt:text-xs">
            <p>Длинна камня: {width} мм</p>
            <p>Высота камня: {height} мм</p>
            <p>Толщина камня: {thickness} мм</p>
          </Typography>
        </CardBody>
        <CardFooter className="pt-0 flex items-center mt-4">
          <CustomButton
            onClick={() => {
              if (_id && confirm('Вы действительно хотите удалить запись?')) {
                handleDelete(_id);
              }
            }}>
            <AiFillDelete />
          </CustomButton>
          <CustomButton
            onClick={(e) => {
              e.preventDefault();
              setUpdateForm(true);
              setOneStone({
                imageUrl,
                width,
                height,
                stoneType,
                selectedSide,
                selectedRow,
                count,
                _id,
              });
            }}>
            <AiFillEdit />
          </CustomButton>
        </CardFooter>
      </Card>
      <Dialog
        size="xl"
        open={open}
        handler={handleOpen}
        className="flex items-center justify-center w-[70vw] h-[80vh] mx-auto mt-[70px] overflow-hidden object-center ">
        <DialogBody divider={true} className="">
          <Image
            // @ts-ignore
            src={imageUrl}
            width={3500}
            height={3500}
            alt="poster"
            className="aspect-square p-2 object-contain w-full h-full"
          />
        </DialogBody>
      </Dialog>
    </>
  );
}

export default StoneCard;
