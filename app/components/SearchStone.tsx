'use client';
import { useState, useEffect, FormEvent } from 'react';
import CustomButton from './CustomButton';
import Title from './Title';

import { toast } from 'react-toastify';
import { useStoneStore } from '@/data/stores/useStoneStore';
import StoneCard from './StoneCard';
import { Dialog, DialogBody} from '@material-tailwind/react';
import { IStone } from '@/types/tools';
const SearchStone = () => {
  const { setSearchStone, searchStone } = useStoneStore((state) => state);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const [stoneName, setStoneName] = useState<string>('');
  const handleSubmit = async (e : FormEvent) => {
    e.preventDefault();
    await setSearchStone(stoneName);

    console.log(searchStone);

    setStoneName('');
  };

  useEffect(() => {
    if (searchStone.length !== 0) {
      handleOpen();
    }
  }, [searchStone]);
  return (
    <>
      <form className="flex gap-4 items-center mr-10 sm:text-sm" onSubmit={handleSubmit}>
        <input
          className="p-2 rounded-sm w-96 sm:w-64 sm:h-[45px] text-base"
          name=""
          id=""
          type="text"
          placeholder="поиск камня в пирамиде..."
          value={stoneName}
          onChange={(e: any) => {
            setStoneName(e.target.value);
          }}
        />
        <CustomButton>Поиск</CustomButton>
      </form>
      <Dialog
        size="xl"
        open={open}
        handler={handleOpen}
        className="w-[80vw] h-[80vh]   overflow-scroll mx-auto mt-[20px] p-5">
        <DialogBody divider={true} className="p-0 ">
          <Title style="mb-10">Найденные результаты</Title>

          <div className="flex flex-wrap  gap-5">
            {searchStone?.map((elem: IStone, index: number) => {
              return (
                <>
                  <StoneCard selectedRow={index} index={index} item={elem} isSearch={true} />
                </>
              );
            })}
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default SearchStone;
