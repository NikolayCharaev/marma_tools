'use client';
import { FC, useState } from 'react';

import { AiOutlineLoading3Quarters, AiFillCloseCircle } from 'react-icons/ai';
import { addImage } from '@/utils/uploadImage';
import { getCurrentDateTime } from '@/utils/day';
import { useApplicationStore } from '@/data/stores/applicationStore';
import CustomButton from './CustomButton';

interface IApplicationsFormProps {
  formModal: boolean;
  setFormModal: (value: boolean) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  type: string;
}

const ApplicationsForm: FC<IApplicationsFormProps> = ({
  formModal,
  setFormModal,
  loading,

  setLoading,
  type,
}) => {
  const { fetchAllApplications, allApplications } = useApplicationStore((state) => state);
  const [postModel, setPostModel] = useState({
    imageUrl: null as File | null,
    date: getCurrentDateTime(),
    applicationName: '',
    more: '',
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const setNewImage = await addImage(postModel?.imageUrl);
    if (postModel?.imageUrl !== null) {
      try {
        e.preventDefault();
        if (setNewImage) {
          setPostModel((postModel.imageUrl = setNewImage));
        }
      } catch (err) {
        console.error('Error uploading image:', err);
      }
    }

    try {
      await fetch('/api/applications', {
        method: 'POST',
        body: JSON.stringify({
          applicationName: postModel.applicationName,
          more: postModel.more,
          imageUrl: postModel.imageUrl,
          date: postModel.date,
        }),
      });

      // Обновление состояния postModel
      setPostModel({
        imageUrl: null,
        date: getCurrentDateTime(),
        applicationName: '',
        more: '',
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setFormModal(false);
      fetchAllApplications('/api/applications');
    }
  };

  return (
    <div className="absolute top-0 left-1/2 ransform -translate-x-1/2 z-20">
      {loading && (
        <div className="flex justify-center items center ">
          <div className="flex flex-col gap-4 justify-center items-center z-10 text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl p-3 rounded-2xl absolute transition w-[400px] top-[50px] ">
            <AiOutlineLoading3Quarters className="animate-spin rounded-full" size={40} />
            <p className="text-center">Идет загрузка поста...</p>
          </div>
        </div>
      )}
      {formModal && (
        <div className="w-[700px] shadow-2xl  p-20 mx-auto relative bg-white rounded-xl">
          <p className="mb-4">{type}</p>
          <div className="absolute top-2 right-2">
            <AiFillCloseCircle
              size={35}
              className="cursor-pointer hover:text-red-500 transition"
              onClick={() => {
                setFormModal(false);
              }}
            />
          </div>
          <form action="" className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <input
              required
              type="text"
              placeholder="введите название инструмента(расходника)"
              value={postModel?.applicationName}
              onChange={(e) => setPostModel({ ...postModel, applicationName: e.target.value })}
              className="w-full p-2 border rounded-xl"
            />

            <textarea
              required
              className="p-2 border rounded-xl"
              placeholder="Дополнительная информация"
              value={postModel?.more}
              onChange={(e) => setPostModel({ ...postModel, more: e.target.value })}
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file.type === 'image/jpeg' || file.type === 'image/png') {
                  setPostModel({ ...postModel, imageUrl: e.target.files[0] });
                } else {
                  alert('выбрать можно только изображение');
                  return;
                }
              }}
            />

            <CustomButton>Отправить</CustomButton>
          </form>
        </div>
      )}
    </div>
  );
};

export default ApplicationsForm;
