'use client';
import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Dialog,
  DialogBody,
} from '@material-tailwind/react';

import Image from 'next/image';

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
      <Card
        className="max-w-[24rem] overflow-hidden cursor-pointer hover:opacity-90 transition mb-10"
        onClick={handleOpen}>
        <CardHeader floated={false} shadow={false} color="transparent" className="m-0 rounded-none">
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
      </Card>
      <Dialog
        size="xl"
        open={open}
        handler={handleOpen}
        className="flex items-center justify-center max-w-[80vw] max-h-[80vh] mx-auto mt-[150px]">
        <DialogBody divider={true} className="p-0 "></DialogBody>
      </Dialog>
    </>
  );
}

export default StoneCard;
