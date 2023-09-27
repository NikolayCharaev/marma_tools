import Pyramid from '@/models/leftovers';
import { connectDB } from '@/utils/database';

export const DELETE = async (req : any) => {
  await connectDB();
  try {
    const { selectedRow, selectedSide, index } = await req.json();

    const pyramid = await Pyramid.findOne({});

    const stone = pyramid[selectedRow][selectedSide];

    // Удаление выбранного элемента
    stone.splice(index, 1);
    // Сохранение изменений в базе данных
    await pyramid.save();

    return new Response('Элемент успешно удален', { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response('Произошла ошибка, повторите попытку позже', { status: 500 });
  }
};

export const PATCH = async (req : any) => {
  await connectDB();
  try {
    const { selectedRow, selectedSide, index, imageUrl, stoneWidth, stoneHeight, _id } = await req.json();
    const pyramid = await Pyramid.findOne({});
    const stone = pyramid[selectedRow][selectedSide]; // объект изменяемого камня

    stone.stoneType = 'asd';
    stone.thickness = '20';
    stone.id = _id;
    stone.width = stoneWidth;
    stone.height = stoneHeight;
    stone.imageUrl = imageUrl;

    await pyramid.save();

    return new Response(stone, { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response('Произошла ошибка, повторите попытку позже', { status: 500 });
  }
};
