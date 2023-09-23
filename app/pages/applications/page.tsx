'use client';
import { useState, useEffect } from 'react';

import { useApplicationStore } from '@/data/stores/applicationStore';
import Title from '@/app/components/Title';
import CustomButton from '@/app/components/CustomButton';

import ApplicationsForm from '@/app/components/ApplicationsForm';
import ApplicationsCard from '@/app/components/ApplicationsCard';
import App from '@/node_modules/next/app';

interface IPost {
  imageUrl: any;
  date: string;
  applicationName: string;
  more?: string;
  _id: string;
}

const Applications = () => {
  const { fetchAllApplications, allApplications } = useApplicationStore((state) => state);

  const [formModal, setFormModal] = useState<boolean>(false); //открытие и закрытие формы
  const [loading, setLoading] = useState<boolean>(false); // прелоадер загрузки
  const [typeModal, setTypeModal] = useState<string>('');
  const [isEdited, setIsEdited] = useState(false);
  const [postId, setPostId] = useState('');

  useEffect(() => {
    fetchAllApplications('/api/applications');
  }, []);

const handlePostId = (value) => {
  
    setPostId(value);
  };

  return (
    <>
      <Title style="mb-5">Список заявок на покупку расходников</Title>
      <div className="mb-10 relative  p-3">
        <div className="mb-5 h-[760px]  grid grid-cols-4 gap-7 overflow-scroll border border-stone-800 rounded-sm    p-5 ">
          {allApplications.map((post) => {
            return (
              <ApplicationsCard
                isEdited={isEdited}
                handlePostId={handlePostId}
                setIsEdited={setIsEdited}
                setTypeModal={setTypeModal}
                post={post}
                formModal={formModal}
                setFormModal={setFormModal}
                key={post._id}
              />
            );
          })}
        </div>

        <ApplicationsForm
          isEdited={isEdited}
          postId={postId}
          setIsEdited={setIsEdited}
          typeModal={typeModal}
          type={typeModal}
          formModal={formModal}
          setFormModal={setFormModal}
          loading={loading}
          setLoading={setLoading}
        />
      </div>
      <CustomButton
        onClick={() => {
          setFormModal(true);
          setTypeModal('Добавить новую заявку');
          setIsEdited(false);
        }}>
        Добавить новую заявку
      </CustomButton>
    </>
  );
};

export default Applications;
