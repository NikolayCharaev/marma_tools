'use client';
import { useState, useEffect } from 'react';

import { useApplicationStore } from '@/data/stores/applicationStore';
import Title from '@/app/components/Title';
import CustomButton from '@/app/components/CustomButton';

import ApplicationsForm from '@/app/components/ApplicationsForm';
import ApplicationsCard from '@/app/components/ApplicationsCard';

import { IApplication } from '@/types/tools';

const Applications = () => {
  const { fetchAllApplications, allApplications, pageType, setPageType } = useApplicationStore(
    (state: any) => state,
  );

  const [formModal, setFormModal] = useState<boolean>(false); //открытие и закрытие формы
  const [loading, setLoading] = useState<boolean>(false); // прелоадер загрузки
  const [typeModal, setTypeModal] = useState<string>('');
  const [isEdited, setIsEdited] = useState(false);
  const [postId, setPostId] = useState<string>('');

  useEffect(() => {
    setPageType('applications');
    fetchAllApplications('/api/applications');
  }, [setPageType, fetchAllApplications]);

  const handlePostId = (value: string) => {
    setPostId(value);
  };

  return (
    <>
      <Title style="mb-5">Список заявок на покупку расходников</Title>
      <div className="mb-10 relative  p-3">
        <div className="mb-10 grid grid-cols-4 lg:grid-cols-2 mt:grid-cols-1 gap-7  rounded-sm  pb-4 ">
          {allApplications.map((post: IApplication) => {
            return (
              <ApplicationsCard
                pageType={pageType}
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
          pageType={pageType}
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
        <CustomButton
          onClick={() => {
            setFormModal(true);
            setTypeModal('Добавить новую заявку');
            setIsEdited(false);
          }}>
          Добавить новую заявку
        </CustomButton>
      </div>
    </>
  );
};

export default Applications;
