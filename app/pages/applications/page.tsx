'use client';
import { useState, useEffect } from 'react';

import { useApplicationStore } from '@/data/stores/applicationStore';
import Title from '@/app/components/Title';
import CustomButton from '@/app/components/CustomButton';

import ApplicationsForm from '@/app/components/ApplicationsForm';
import ApplicationsCard from '@/app/components/ApplicationsCard';

interface IPost {
  imageUrl: any;
  date: string;
  applicationName: string;
  more?: string;
  _id: string;
}

const Applications = () => {
  const { fetchAllApplications, allApplications } = useApplicationStore((state) => state);

  const [formModal, setFormModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [typeModal, setTypeModal] = useState<string>('');

  useEffect(() => {
    fetchAllApplications('/api/applications');
  }, []);

  return (
    <>
      <Title style="mb-10">Список заявок</Title>

      <div className="mb-10 relative ">
        <div className="mb-20 h-[700px] flex flex-wrap gap-7 justify-start overflow-scroll">
          {allApplications.map((post, index) => {
            return (
              <ApplicationsCard
                post={post}
                key={post._id}
                formModal={formModal}
                setFormModal={setFormModal}
                typeModal={typeModal}
                setTypeModal={setTypeModal}
              />
            );
          })}
        </div>

        <ApplicationsForm
          type={typeModal}
          formModal={formModal}
          setFormModal={setFormModal}
          loading={loading}
          setLoading={setLoading}
        />
        <CustomButton onClick={() => {
          setFormModal(true)
          setTypeModal('Добавить новую запись')
        }}>Добавить новую заявку</CustomButton>
      </div>
    </>
  );
};

export default Applications;
