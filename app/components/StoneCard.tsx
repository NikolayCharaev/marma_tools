'use client';
import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Dialog,
  CardFooter,
  Button,
  DialogBody,
} from '@material-tailwind/react';

import Image from 'next/image';
import CustomButton from './CustomButton';

type IStoneProps = {
  stoneType: string;
  width: number;
  height: number;
};

function StoneCard({ stone }: IStoneProps) {
  const { imageUrl, width, height, stoneType } = stone;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  return (
    <>
      <Card className="max-w-[24rem] overflow-hidden cursor-pointer hover:opacity-90 transition mb-10">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 rounded-none"
          onClick={handleOpen}>
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
            alt="ui/ux review check"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h4" color="blue-gray">
            {stoneType}
          </Typography>
          <Typography variant="lead" color="gray" className="mt-3 font-normal">
            <p>Длинна камня: {width} мм</p>
            <p>Высота камня: {height} мм</p>
          </Typography>
        </CardBody>
        <CardFooter className="pt-0 flex items-center mt-4">
          <CustomButton>Удалить</CustomButton>
          <CustomButton>Редактировать</CustomButton>
        </CardFooter>
      </Card>
      <Dialog
        size="xl"
        open={open}
        handler={handleOpen}
        className="flex items-center justify-center max-w-[80vw] max-h-[80vh] mx-auto mt-[150px] overflow-hidden object-center">
        <DialogBody divider={true} className="">
          <img
            src="https://globalgranit.ru/images/005/965/545/5965545/original/slab_stone_volakas_extra_mramor_20.jpg"
            alt="ui/ux review check"
            className="aspect-video p-2"
          />
        </DialogBody>
      </Dialog>
    </>
  );
}

export default StoneCard;
