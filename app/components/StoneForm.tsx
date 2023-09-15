'use client';
import { useState } from 'react';
import CustomButton from './CustomButton';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Title from './Title';

const StoneForm = ({
  setFormModal,
  formModal,
  selectedRow,
  selectedSide,
  updateList,
  setUpdateList,
  handlePostsUpdate,
}) => {
  const [stone, setStone] = useState({
    stoneType: '',
    stoneHeight: '',
    stoneWidth: '',
    imageUrl: null as File | null,
    thickness: '', // толщина камня
  });

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e) => {
    if (stone?.imageUrl !== undefined) {
      try {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append('file', stone?.imageUrl);
        formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_SECRET);

        const fetchImage = await fetch('https://api.cloudinary.com/v1_1/dz6309zzc/image/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await fetchImage.json();
        setStone((stone.imageUrl = data.secure_url));
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
      handlePostsUpdate(true);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between mb-10">
        <Title>Добавить новый камень</Title>
        <CustomButton
          onClick={() => {
            setFormModal(false);
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
          <form action="" onSubmit={handleSubmit} className="w-full h-full flex flex-col   gap-8">
            <input
              required
              type="text"
              placeholder="введите название камня"
              value={stone?.stoneType}
              onChange={(e) => setStone({ ...stone, stoneType: e.target.value })}
              className="w-full p-2 border rounded-xl"
            />

            <div className="flex gap-6 ">
              <input
                required
                className="p-2 border rounded-xl"
                type="number"
                placeholder="длина камня"
                value={stone?.stoneWidth}
                onChange={(e) => setStone({ ...stone, stoneWidth: e.target.value })}
              />
              <input
                required
                className="p-2 border rounded-xl"
                type="number"
                placeholder="ширина камня"
                value={stone?.stoneHeight}
                onChange={(e) => setStone({ ...stone, stoneHeight: e.target.value })}
              />
            </div>

            <select
              className="max-w-[300px]"
              value={stone?.thickness}
              onChange={(e) => setStone({ ...stone, thickness: e.target.value })}>
              <option value="">Выберите толщину камня</option>
              <option value="20">20mm</option>
              <option value="30">30mm</option>
              <option value="40">40mm</option>
            </select>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file.type === 'image/jpeg' || file.type === 'image/png') {
                  setStone({ ...stone, imageUrl: e.target.files[0] });
                } else {
                  alert('выбрать можно только изображение');
                  return;
                }
              }}
            />

            <CustomButton>Отправить</CustomButton>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StoneForm;
