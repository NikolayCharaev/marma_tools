'use client';
import { useState } from 'react';
import CustomButton from './CustomButton';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useStoneStore } from '@/data/stores/useStoneStore';

import { addImage } from '@/utils/uploadImage';
import Title from './Title';

import CreateStoneForm from './createStoneForm';

import UpdateStoneForm from './UpdateStoneForm';

const StoneForm = ({
  setFormModal,
  updateForm,
  setUpdateForm,
  selectedRow,
  setStoneUpdate,
  stoneUpdate,
  selectedSide,
  count,
}) => {
  const [stone, setStone] = useState({
    stoneType: '',
    stoneHeight: '',
    stoneWidth: '',
    imageUrl: null as File | null,
    thickness: '', // толщина камня
  });

  const { updateStone, oneStone } = useStoneStore((stone) => stone);
  const [updateImageUrl, setUpdateImageUrl] = useState('');

  const { fetchAllStones } = useStoneStore((state) => state);

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e) => {
    console.log(stone.imageUrl);
    if (stone?.imageUrl !== undefined) {
      try {
        e.preventDefault();
        setLoading(true);

        const setNewImage = await addImage(stone?.imageUrl);
        if (setNewImage) {
          setStone((stone.imageUrl = setNewImage));
        }
      } catch (err) {
        console.error('Error uploading image:', err);
      }
    }

    try {
      await fetch('/api/stones', {
        method: 'POST',
        body: JSON.stringify({
          stoneType: stone.stoneType,
          width: stone.stoneWidth,
          height: stone.stoneHeight,
          thickness: stone.thickness,
          imageUrl: stone.imageUrl,
          selectedRow,
          selectedSide,
        }),
      });
    } catch (err) {
      console.log('Произошла ошибка при загрузке поста', err);
    } finally {
      setLoading(false);
      setFormModal(false);
      fetchAllStones('/api/stones');
    }
  };
  const handleUpdate = async (e: any) => {
    e.preventDefault();
    console.log(selectedSide);

    const { stoneWidth, stoneHeight, imageUrl } = updateStone;

    if (imageUrl !== undefined) {
      try {
        e.preventDefault();
        setLoading(true);
        const setNewImage = await addImage(stone?.imageUrl);
        if (setNewImage) {
          setUpdateImageUrl((updateStone.imageUrl = setNewImage));
        }
      } catch (err) {
        console.error('Error uploading image:', err);
      }
    }

    try {
      await fetch('/api/stones/' + oneStone._id, {
        method: 'PATCH',
        body: JSON.stringify({
          stoneWidth: stoneWidth,
          stoneHeight: stoneHeight,
          imageUrl: imageUrl,
          selectedRow,
          selectedSide: oneStone.selectedSide,
          index: count,
          id: oneStone._id,
        }),
      });
    } catch (err) {
      console.log(err);
    } finally {
      console.log('finally');
      setLoading(false);
      setFormModal(false);
      fetchAllStones('/api/stones');
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-10">
        <Title>{!updateForm ? 'Добавить новый камень' : 'Изменить параметры камня'}</Title>
        <CustomButton
          onClick={() => {
            setFormModal(false);
            setUpdateForm(false);
          }}>
          Закрыть
        </CustomButton>
      </div>

      <div className="w-full flex flex-col items-center mt-[200px]">
        {loading && (
          <div className="flex flex-col gap-4 justify-center items-center z-10 text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl p-3 rounded-2xl absolute transition w-[400px] top-[50px]">
            <AiOutlineLoading3Quarters className="animate-spin rounded-full" size={40} />
            <p className="text-center">Идет загрузка поста...</p>
          </div>
        )}
        <div className="w-[700px] shadow-2xl p-20">
          <form
            action=""
            onSubmit={!updateForm ? handleSubmit : handleUpdate}
            className="w-full h-full flex flex-col   gap-8">
            {!updateForm ? (
              <>
                <CreateStoneForm stone={stone} setStone={setStone} />
              </>
            ) : (
              <>
                <UpdateStoneForm setStoneUpdate={setStoneUpdate} stoneUpdate={stoneUpdate} />
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default StoneForm;
