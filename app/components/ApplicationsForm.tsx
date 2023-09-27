'use client';
import { FC, useState, FormEvent } from 'react';

import { AiOutlineLoading3Quarters, AiFillCloseCircle } from 'react-icons/ai';
import { addImage } from '@/utils/uploadImage';
import { getCurrentDateTime } from '@/utils/day';
import { useApplicationStore } from '@/data/stores/applicationStore';
import Preloader from './Preloader';
import CustomButton from './CustomButton';

interface IApplicationsFormProps {
  formModal: boolean;
  setFormModal: (value: boolean) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  type: string;
  typeModal: string;
  setIsEdited: (value: boolean) => void;
  isEdited: boolean;
  postId: string;
  pageType: string;
}

const ApplicationsForm: FC<IApplicationsFormProps> = ({
  formModal,
  setFormModal,
  typeModal,
  setIsEdited,
  isEdited,
  postId,
  loading,
  pageType,
  setLoading,
  type,
}) => {
  // @ts-ignore
  const { fetchPostApplication, fetchPatchApplication } = useApplicationStore((state) => state);
  const [postModel, setPostModel] = useState({
    imageUrl: null as File | null,
    date: getCurrentDateTime(),
    applicationName: '',
    more: '',
  });

  const handleSubmit = async (e: FormEvent) => {
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
      fetchPostApplication(`/api/${pageType}`, postModel);
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
    }
  };

  const handleUpdate = async (e: FormEvent) => {
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
      fetchPatchApplication(`/api/${pageType}/${postId}`, postModel, postId);
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
    }
  };

  return (
    <div className="absolute top-0 left-1/2 ransform -translate-x-1/2 z-20 ">
      {loading && <Preloader />}
      {formModal && (
        <div className="max-w-[700px] xs:max-w-[400px] shadow-2xl  p-20 mx-auto relative bg-white rounded-xl">
          <p className="mb-4">{typeModal}</p>
          <div className="absolute top-2 right-2">
            <AiFillCloseCircle
              size={35}
              className="cursor-pointer hover:text-red-500 transition"
              onClick={() => {
                setFormModal(false);
              }}
            />
          </div>
          <form
            action=""
            className="flex flex-col gap-5"
            onSubmit={!isEdited ? handleSubmit : handleUpdate}>
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
                const file = e.target.files?.[0];
                if (file?.type === 'image/jpeg' || file?.type === 'image/png') {
               // @ts-ignore
                  setPostModel({ ...postModel, imageUrl: e.target.files?.[0] });
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
