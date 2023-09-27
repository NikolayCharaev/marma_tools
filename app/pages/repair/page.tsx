'use client';
import { useState, useEffect } from 'react';

import { useRepairStore } from '@/data/stores/repairStore';
import Title from '@/app/components/Title';
import { Typography } from '@material-tailwind/react';
import CustomButton from '@/app/components/CustomButton';

import ApplicationsForm from '@/app/components/ApplicationsForm';
import ApplicationsCard from '@/app/components/ApplicationsCard';

import { useApplicationStore } from '@/data/stores/applicationStore';

const Repair = () => {
  const { fetchAllRepairs, allRepairs } = useRepairStore((state) => state);
  const { setPageType, pageType, allApplications, fetchAllApplications } = useApplicationStore(
    (state) => state,
  );
  const [formModal, setFormModal] = useState<boolean>(false); //открытие и закрытие формы
  const [loading, setLoading] = useState<boolean>(false); // прелоадер загрузки
  const [typeModal, setTypeModal] = useState<string>('');
  const [isEdited, setIsEdited] = useState(false);
  // const [pageType, setPageType] = useState<string>('');
  const [postId, setPostId] = useState('');

  useEffect(() => {
    setPageType('repairs');
    fetchAllApplications('/api/repairs');
  }, [setPageType,fetchAllApplications]);

  const handlePostId = (value : string) => {
    setPostId(value);
  };

  return (
    <>
      <Title style="mb-5">Список заявок на ремонт инструментов</Title>
      <div className="mb-10 relative  p-3">
        <div className="mb-5 h-[760px] grid grid-cols-4 lg:grid-cols-2 mt:grid-cols-1 gap-7 overflow-scroll rounded-sm  pb-4">
          {allApplications.length <= 0 ? (
            <Typography variant="h1" className="text-center w-full">
              Тут пока ничего нет
            </Typography>
          ) : (
            allApplications.map((post) => {
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
            })
          )}
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

export default Repair;
