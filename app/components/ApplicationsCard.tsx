'use client';
import { useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Typography } from '@material-tailwind/react';
import notImage from '@/public/leftovers/not-image.jpg';
import Image from 'next/image';
import CustomButton from './CustomButton';
import { useApplicationStore } from '@/data/stores/applicationStore';

const ApplicationsCard = ({ post, formModal, setFormModal, typeModal, setTypeModal }) => {
  const { fetchAllApplications } = useApplicationStore();
  const handleDelete = async (id) => {
    try {
      if (confirm('удалить пост?')) {
        const deletePost = await fetch('/api/applications/' + id, {
          method: 'DELETE',
        });
      }
    } catch (err) {
      console.log(err);
    } finally {
      fetchAllApplications('/api/applications');
    }
  };

  const handleUpdate = (id) => {};

  const { more, date, imageUrl, applicationName, _id } = post;
  return (
    <Card className="w-[24rem] h-[24rem] overflow-hidden ">
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
          <Image
            src={notImage}
            alt="not-image"
            className="object-cover w-full h-full max-w-96 max-h-52"
          />
        ) : (
          <img
            src={imageUrl}
            alt="poster"
            className="object-cover w-full h-full  max-w-96 max-h-52"
          />
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
        <div className="flex justify-between mb-5">
          <CustomButton onClick={() => handleDelete(_id)}>Удалить</CustomButton>
          <CustomButton
            onClick={() => {
              setFormModal(true);
              setTypeModal('Изменить созданную запись');
              handleUpdate(_id);
            }}>
            Редактировать
          </CustomButton>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ApplicationsCard;
