'use client';
import { useEffect, useState } from 'react';
import { Dialog, DialogBody, Card, Typography } from '@material-tailwind/react';
import Image from 'next/image';
import StoneCard from './StoneCard';
import Title from './Title';
import CustomButton from './CustomButton';
import StoneForm from './StoneForms';
import { useStoneStore } from '@/data/stores/useStoneStore';
function LeftoversCard({ card, imageBg, index, handlePostsUpdate }) {
  const [open, setOpen] = useState(false);
  const { allStones, setAllStones, fetchAllStones } = useStoneStore((state) => state);

  const handleOpen = () => setOpen((cur) => !cur);
  const { left, right } = card;

  const [selectedSide, setSelectedSide] = useState<string>('');
  const [selectedRow, setSelectedRow] = useState<string>('');
  const [formModal, setFormModal] = useState<boolean>(false);
  const [updateForm, setUpdateForm] = useState<boolean>(false);
  const [stoneUpdate, setStoneUpdate] = useState({
    width: '',
    height: '',
    imageUrl: '',
  });

  const handleStonePacth = (prop) => {
    setStoneUpdate({
      ...stoneUpdate,
      width: prop.width,
      height: prop.height,
      imageUrl: prop.imageUrl,
    });
  };

  useEffect(() => {
    console.log('hello');
  }, [stoneUpdate]);

  return (
    <>
      <Card
        className=" cursor-pointer overflow-hidden transition-opacity hover:opacity-90 w-72 h-[70vh] relative"
        onClick={() => {
          handleOpen();
          switch (index) {
            case 1:
              setSelectedRow('rowOne');
              break;
            case 2:
              setSelectedRow('rowTwo');
              break;
            case 3:
              setSelectedRow('rowThree');
              break;
            case 4:
              setSelectedRow('rowFour');
              break;
            case 5:
              setSelectedRow('rowFive');
              break;
          }
        }}>
        <Image alt="image" className="w-full h-full object-cover" src={imageBg} />

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
                // handlePostsUpdate={handlePostsUpdate}
              />
            </>
          ) : (
            <div className="flex justify-between">
              {card.left && (
                <div className="">
                  <div className="flex justify-between mb-3 gap-5">
                    <Title style="text-left">левая сторона</Title>
                    <CustomButton
                      onClick={() => {
                        setSelectedSide('left');
                        setFormModal(true);
                        // handlePostsUpdate(false);
                      }}>
                      Добавить
                    </CustomButton>
                  </div>

                  {left?.map((stone, counter) => {
                    return (
                      <div key={stone._id}>
                        <StoneCard
                          count={counter}
                          stone={stone}
                          setUpdateForm={setUpdateForm}
                          selectedSide={'left'}
                          selectedRow={selectedRow}
                          // handlePostsUpdate={handlePostsUpdate}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
              <p>Ряд {index}</p>
              {card.right && (
                <div className="">
                  <div className="flex justify-between mb-3 gap-5">
                    <Title style="text-left">правая сторона</Title>
                    <CustomButton
                      onClick={() => {
                        setSelectedSide('right');
                        setFormModal(true);
                        handlePostsUpdate(false);
                      }}>
                      Добавить
                    </CustomButton>
                  </div>
                  {right?.map((stone, counter) => {
                    return (
                      <div key={stone._id}>
                        <StoneCard
                          setStoneUpdate={setStoneUpdate}
                          stoneUpdate={stoneUpdate}



                          count={counter}
                          stone={stone}
                          setUpdateForm={setUpdateForm}
                          selectedSide={'right'}
                          selectedRow={selectedRow}
                          handlePostsUpdate={handlePostsUpdate}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </DialogBody>
      </Dialog>
    </>
  );
}

export default LeftoversCard;
