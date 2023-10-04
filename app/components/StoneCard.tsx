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
import { AiFillDelete } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { useStoneStore } from '@/data/stores/useStoneStore';

import notImage from '@/public/leftovers/not-image.jpg';
import { IStone } from '@/types/tools';
import Image from 'next/image';
import CustomButton from './CustomButton';

type IStoneProps = {
  selectedRow?: number;
  item: IStone;
  index: number;
  isSearch?: boolean;
};

function StoneCard({ selectedRow, item, index, isSearch }: IStoneProps) {
  const { imageUrl, width, height, stoneType, thickness, _id } = item;
  const [open, setOpen] = useState(false);
  const { fetchAllStones } = useStoneStore((state: any) => state);
  const handleOpen = () => setOpen((cur) => !cur);

  const handleDelete = async (id: string) => {
    toast.info('удаление записи...', { autoClose: 2000 }); // Показываем индикатор загрузки
    const responce = await fetch('/api/stones/' + id, {
      method: 'DELETE',
      body: JSON.stringify({
        selectedRow: selectedRow,
        index: index,
      }),
    });
    if (responce.status === 200) {
      toast.success('Запись успешно удалена', { autoClose: 2000 });
      fetchAllStones('/api/stones');
    }
  };

  return (
    <div className="grow  basis-64  rounded-xl">
      <Card className="shadow-xl  overflow-hidden cursor-pointer hover:opacity-90 transition mb-10 ">
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
        <CardBody className="p-4">
          <Typography variant="h4" color="blue-gray" className="sm:text-lg">
            {item.stoneType}
          </Typography>
          <Typography
            variant="lead"
            color="gray"
            className="mt-3 font-normal sm:text-sm mt:text-xs">
            {isSearch && <p>Находится в {item.selectedRow} ряду</p>}
            <p>Длинна камня: {width} мм</p>
            <p>Высота камня: {height} мм</p>
            <p>Толщина камня: {thickness} мм</p>
          </Typography>
        </CardBody>
        {!isSearch && (
          <CardFooter className="pt-0 px-4 flex items-center mt-4">
            <CustomButton
              onClick={() => {
                if (_id && confirm('Вы действительно хотите удалить запись?')) {
                  handleDelete(_id);
                }
              }}>
              <AiFillDelete />
            </CustomButton>
          </CardFooter>
        )}
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
            width={1200}
            height={1200}
            alt="poster"
            className="aspect-square p-2 object-contain w-full h-full"
          />
        </DialogBody>
      </Dialog>
    </div>
  );
}

export default StoneCard;
