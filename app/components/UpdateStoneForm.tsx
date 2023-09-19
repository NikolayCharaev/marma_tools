import CustomButton from './CustomButton';

import { useStoneStore } from '@/data/stores/useStoneStore';




const UpdateStoneForm = ({ setStoneUpdate, stoneUpdate }) => {

  const {oneStone,setUpdateStone, updateStone} = useStoneStore(state => state)


  
  return (
    <>
      <div className="flex gap-6 ">
        <input
          required
          className="p-2 border rounded-xl"
          type="number"
          placeholder="новая длинна камня"
          value={stoneUpdate?.stoneWidth}
          onChange={(e) => setUpdateStone({ ...updateStone, stoneWidth: e.target.value })}
        />
        <input
          required
          className="p-2 border rounded-xl"
          type="number"
          placeholder="новая ширина камня"
          value={stoneUpdate?.stoneHeight}
          onChange={(e) => setUpdateStone({ ...updateStone, stoneHeight: e.target.value })}
        />
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file.type === 'image/jpeg' || file.type === 'image/png') {
            setUpdateStone({ ...updateStone, imageUrl: e.target.files[0] });
          } else {
            alert('выбрать можно только изображение');
            return;
          }
        }}
      />

      <CustomButton>Cохранить</CustomButton>
    </>
  );
};

export default UpdateStoneForm;
