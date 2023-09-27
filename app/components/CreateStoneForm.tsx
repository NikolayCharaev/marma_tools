import { IStone } from '@/types/tools';
import { FC } from 'react';
import CustomButton from './CustomButton';

interface IStoneForm {
  stone: IStone;
  setStone: (value: any) => void;
}

const CreateStoneForm: FC<IStoneForm> = ({ stone, setStone }) => {
  return (
    <>
      <input
        required
        type="text"
        placeholder="введите название камня"
        value={stone?.stoneType}
        onChange={(e) => setStone({ ...stone, stoneType: e.target.value })}
        className="w-full p-2 border rounded-xl"
      />

      <div className="flex gap-6 sm:flex-col xs:gap-3">
        <input
          required
          className="p-2 border rounded-xl"
          type="number"
          placeholder="длинна камня"
          value={stone?.stoneWidth}
          onChange={(e) => setStone({ ...stone, stoneWidth: e.target.value })}
        />
        <input
          required
          className="p-2 border rounded-xl"
          type="number"
          placeholder="ширина камня"
          value={stone?.stoneHeight}
          onChange={(e) => setStone({ ...stone, stoneHeight: e.target.value })}
        />
      </div>

      <select
        className="max-w-[300px]"
        value={stone?.thickness}
        onChange={(e) => setStone({ ...stone, thickness: e.target.value })}>
        <option value="">Выберите толщину камня</option>
        <option value="20">20mm</option>
        <option value="30">30mm</option>
        <option value="40">40mm</option>
      </select>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file?.type === 'image/jpeg' || file?.type === 'image/png') {
            // @ts-ignore
            setStone({ ...stone, imageUrl: e.target.files?.[0] });
          } else {
            alert('выбрать можно только изображение');
            return;
          }
        }}
      />

      <CustomButton>Отправить</CustomButton>
    </>
  );
};

export default CreateStoneForm;
