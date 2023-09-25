'use client';
import { useState, FC } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Typography } from '@material-tailwind/react';
import notImage from '@/public/leftovers/not-image.jpg';
import Image from 'next/image';
import CustomButton from './CustomButton';
import { useApplicationStore } from '@/data/stores/applicationStore';

interface IPostProps {
  post: {
    more: string;
    date: string;
    imageUrl: string;
    applicationName: string;
    _id: string;
    setTypeModal: (value: string) => void;
    setIsEdited: (value: boolean) => void;
    isEdited: boolean;
    pageType: string;
  };
  formModal: boolean;
  setFormModal: (value: boolean) => void;
}
const ApplicationsCard: FC<IPostProps> = ({
  post,
  formModal,
  setFormModal,
  setTypeModal,
  setIsEdited,
  pageType,
  isEdited,
  handlePostId,
}) => {
  const { fetchAllApplications } = useApplicationStore();
  const { more, date, imageUrl, applicationName, _id } = post;

  const handleDelete = async (id: string) => {
    try {
      if (confirm('удалить пост?')) {
        const deletePost = await fetch(`/api/${pageType}/` + id, {
          method: 'DELETE',
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      fetchAllApplications(`/api/${pageType}`);
    }
  };

  return (
    <Card className="w-full h-[450px] overflow-hidden shadow-xl ">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 rounded-none relative">
        <Typography
          variant="h6"
          color="blue"
          className="absolute top-2 right-2 p-2 rounded-xl bg-white">
          {date}
        </Typography>
        {imageUrl === null ? (
          <Image src={notImage} alt="not-image" className="object-cover w-full h-full " />
        ) : (
          <img src={imageUrl} alt="poster" className="object-cover w-full h-64 " />
        )}
      </CardHeader>
      <CardBody className="p-2">
        <Typography variant="h4" color="blue-gray">
          {applicationName}
        </Typography>
        {more && (
          <Typography variant="lead" color="gray" className="mt-3 font-normal mb-5">
            {more}
          </Typography>
        )}
      </CardBody>
      <CardFooter className="flex items-center justify-between p-2">
        <div className="flex justify-between mb-5 lg:flex-col mt:flex-row">
          <CustomButton
            onClick={() => {
              handleDelete(_id);
            }}>
            Удалить
          </CustomButton>
          <CustomButton
            onClick={() => {
              setFormModal(true);
              setTypeModal('Изменить запись');
              setIsEdited(true);
              handlePostId(_id);
            }}>
            Редактировать
          </CustomButton>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ApplicationsCard;
