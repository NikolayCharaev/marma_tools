'use client';
import { FC } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Typography } from '@material-tailwind/react';
import notImage from '@/public/leftovers/not-image.jpg';
import Image from 'next/image';
import CustomButton from './CustomButton';
import { useApplicationStore } from '@/data/stores/applicationStore';
import { AiFillDelete } from 'react-icons/ai';

interface IPostProps {
  post: {
    more: string;
    date: string;
    imageUrl: string;
    applicationName: string;
    _id: string;
  };
  setIsEdited?: (value: boolean) => void;
  formModal?: boolean;
  setTypeModal?: (value: string) => void;
  isEdited?: boolean;
  pageType?: string;
  setFormModal?: (value: boolean) => void;
  handlePostId?: (value: string) => void;
  isAdmin?: boolean;
}
const ApplicationsCard: FC<IPostProps> = ({
  post,
  formModal,
  isAdmin,
  setFormModal,
  setTypeModal,
  setIsEdited,
  pageType,
  isEdited,
  handlePostId,
}) => {
  // @ts-ignore
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
          <Image
            src={imageUrl}
            width={256}
            height={296}
            alt="poster"
            className="object-cover w-full h-64 "
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
        <div className="flex justify-between mb-5 lg:flex-col mt:flex-row">
          <CustomButton
            onClick={() => {
              handleDelete(_id);
            }}>
            <AiFillDelete />
          </CustomButton>
          {!isAdmin && (
            <CustomButton
              onClick={() => {
                // @ts-ignore
                setFormModal(true);
                // @ts-ignore
                setTypeModal('Изменить запись');
                // @ts-ignore
                setIsEdited(true);
                // @ts-ignore
                handlePostId(_id);
              }}>
              Редактировать
            </CustomButton>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ApplicationsCard;
