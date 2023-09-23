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

import { useStoneStore } from '@/data/stores/useStoneStore';

import notImage from '@/public/leftovers/not-image.jpg';

import Image from 'next/image';
import CustomButton from './CustomButton';

type IStoneProps = {
  stoneType: string;
  width: number;
  height: number;
};

function StoneCard({ stone, selectedSide, selectedRow, setUpdateForm, count }: IStoneProps) {
  const { imageUrl, width, height, stoneType, thickness, _id } = stone;

  const { oneStone, setOneStone, fetchAllStones } = useStoneStore((state) => state);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const handleDelete = async (id) => {
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
      <Card className="max-w-[24rem] overflow-hidden cursor-pointer hover:opacity-90 transition mb-10">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 rounded-none h-[25rem]  object-cover"
          onClick={handleOpen}>
          {imageUrl === undefined ? (
            <Image src={notImage} alt="not-image" className="object-cover w-full h-full " />
          ) : (
            <img src={imageUrl} alt="poster" className="object-cover w-full h-full " />
          )}
        </CardHeader>
        <CardBody>
          <Typography variant="h4" color="blue-gray">
            {stoneType}
          </Typography>
          <Typography variant="lead" color="gray" className="mt-3 font-normal">
            <p>Длинна камня: {width} мм</p>
            <p>Высота камня: {height} мм</p>
            <p>Толщина камня: {thickness} мм</p>
          </Typography>
        </CardBody>
        <CardFooter className="pt-0 flex items-center mt-4">
          <CustomButton
            onClick={() => {
              if (confirm('Вы действительно хотите удалить запись?')) {
                handleDelete(_id);
              }
            }}>
            Удалить
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
            Редактировать
          </CustomButton>
        </CardFooter>
      </Card>
      <Dialog
        size="xl"
        open={open}
        handler={handleOpen}
        className="flex items-center justify-center w-[70vw] h-[80vh] mx-auto mt-[70px] overflow-hidden object-center ">
        <DialogBody divider={true} className="">
          <img
            src={imageUrl}
            className="aspect-square p-2 w-full h-full  object-contain w-full h-full"
          />
        </DialogBody>
      </Dialog>
    </>
  );
}

export default StoneCard;
