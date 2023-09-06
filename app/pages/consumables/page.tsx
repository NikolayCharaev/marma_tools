import Title from '@/app/components/Title';
import React from 'react';
import Card from '@/app/components/Card';
import { consumablesData } from '@/data/consumablesData';
const Consumables = () => {
  return (
    <div>
      <Title>Расходники</Title>

      <div className="flex flex-wrap gap-4 justify-center">
        {consumablesData.map((elem, index) => {
          const { imageUrl, title } = elem;
          return (
            <Card
              key={index}
              title={String(title)}
              imageUrl={imageUrl}
              path={'/'}
              buttonText="внести изменения"
            />
          );
        })}
      </div>
    </div>
  );
};

export default Consumables;
