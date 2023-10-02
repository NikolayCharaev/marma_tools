'use client';
import { useEffect, useState } from 'react';
import { Dialog, DialogBody, Card, Typography, Tooltip } from '@material-tailwind/react';
import Image from 'next/image';
import StoneCard from './StoneCard';
import Title from './Title';
import CustomButton from './CustomButton';
import StoneForm from './StoneForms';

import { AiFillFileAdd } from 'react-icons/ai';

// import { IStone } from '../types/tools';
import { IStone } from '../../types/tools';
import { useStoneStore } from '@/data/stores/useStoneStore';

interface ILeftowersCard {
  card: any;
  imageBg: string;
  index: number;
}

{
  /*// @ts-ignore*/
}
function LeftoversCard({ card, imageBg, index }: ILeftowersCard) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  // const { left, right } = card;

  const { allStones } = useStoneStore((state) => state);
  const [selectedSide, setSelectedSide] = useState<string>('');
  const [selectedRow, setSelectedRow] = useState<number>(0);
  const [formModal, setFormModal] = useState<boolean>(false);
  const [updateForm, setUpdateForm] = useState<boolean>(false);
  const [stoneUpdate, setStoneUpdate] = useState({
    width: '',
    height: '',
    imageUrl: '',
  });


  return (
    <>
      <Card
        className=" cursor-pointer overflow-hidden transition-opacity hover:opacity-90 w-72 h-[70vh] 3xl:h-96 sm:w-[90vw]  sm:mx-0  relative "
        onClick={() => {
          handleOpen();
          switch (index) {
            case 1:
              setSelectedRow(0);
              break;
            case 2:
              setSelectedRow(1);
              break;
            case 3:
              setSelectedRow(2);
              break;
            case 4:
              setSelectedRow(3);
              break;
            case 5:
              setSelectedRow(4);
              break;
          }
        }}>
        <Image
          alt="image"
          className="w-full h-full object-cover "
          // @ts-ignore
          src={imageBg}
        />

        <Typography
          className="absolute top-[20px] left-[20px] p-2 bg-white rounded-xl "
          variant="h1">
          Ряд {index}
        </Typography>
      </Card>
      <Dialog
        size="xl"
        open={open}
        handler={handleOpen}
        className="w-[80vw] h-[80vh]   overflow-scroll mx-auto mt-[20px] p-5">
        <DialogBody divider={true} className="p-0 ">
          <div className="flex justify-end ">
            {!formModal && (
              <div className="relative mb-5">
                <AiFillFileAdd
                  size={40}
                  className="hover:text-red-500 cursor-pointer transition"
                  onClick={() => setFormModal(true)}
                />
              </div>
            )}
          </div>
          {formModal || updateForm ? (
            <>
              <StoneForm
                setFormModal={setFormModal}
                setUpdateForm={setUpdateForm}
                setStoneUpdate={setStoneUpdate}
                stoneUpdate={stoneUpdate}
                updateForm={updateForm}
                selectedRow={selectedRow}
                selectedSide={selectedSide}
              />
            </>
          ) : (
            <div className="flex flex-wrap  gap-5">
              {card?.map((elem : IStone , index : number) => {
                return (
                  <>
                    <StoneCard
                      index={index}
                      item={elem}
                      selectedRow={selectedRow}
                    />
                  </>
                );
              })}
            </div>
          )}
        </DialogBody>
      </Dialog>
    </>
  );
}

export default LeftoversCard;
