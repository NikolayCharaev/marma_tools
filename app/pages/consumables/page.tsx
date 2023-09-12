import Title from '@/app/components/Title';
import React from 'react';
import CardMini from '@/app/components/CardMini';
import { consumablesData } from '@/data/consumablesData';
import CustomButton from '@/app/components/CustomButton';
const Consumables = () => {
  return (
    <div>
      <Title style='mb-10'>Расходники</Title>

      <div className="flex flex-wrap gap-4 justify-center mb-10">
        {consumablesData.map((elem, index) => {
          const { imageUrl, title } = elem;
          return <CardMini imageUrl={imageUrl} title={title} key={index}/>;
        })}
      </div>
      <div className="float-right">
        <CustomButton>обновить данные</CustomButton>
      </div>
    </div>
  );
};

export default Consumables;
