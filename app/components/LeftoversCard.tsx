'use client';
import React from 'react';
import { Dialog, DialogBody, Card, Typography } from '@material-tailwind/react';

import Image from 'next/image';

import StoneCard from './StoneCard';
import Title from './Title';
import CustomButton from './CustomButton';
function LeftoversCard({ card, imageBg, index }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const { left, right } = card;
  console.log('ELEM', card);
  const adjustedIndex = card + 1;
  return (
    <>
      <Card
        className=" cursor-pointer overflow-hidden transition-opacity hover:opacity-90 w-72 h-[70vh] relative"
        onClick={handleOpen}>
        <Image alt="nature" className="w-full h-full object-cover" src={imageBg} />

        <Typography
          className="absolute top-[20px] left-[20px] p-2 bg-white rounded-xl"
          variant="h1">
          Ряд {index}
        </Typography>
      </Card>
      <Dialog
        size="xl"
        open={open}
        handler={handleOpen}
        className="w-[80vw] h-[80vh] overflow-scroll mx-auto mt-[20px] p-5">
        <DialogBody divider={true} className="p-0 ">
          <div className="flex justify-between">
            {card.left && (
              <div className="">
                <div className="flex justify-between mb-3">
                  <Title style="text-left">левая сторона</Title>
                  <CustomButton>Добавить</CustomButton>
                </div>

                {left?.map((stone) => {
                  return (
                    <>
                      <StoneCard stone={stone} />
                    </>
                  );
                })}
              </div>
            )}
            {card.right && (
              <div className="">
                <div className="flex justify-between mb-3">
                  <Title style="text-left">правая сторона</Title>
                  <CustomButton>Добавить</CustomButton>
                </div>
                {right?.map((stone) => {
                  return (
                    <>
                      <StoneCard stone={stone} />
                    </>
                  );
                })}
              </div>
            )}
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
}

export default LeftoversCard;
