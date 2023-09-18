import Pyramid from '@/models/leftovers';
import { connectDB } from '@/utils/database';

export const DELETE = async (req, { params }) => {
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

export const PATCH = async (req, { params }) => {
  await connectDB();
  try {
    // const { selectedRow, selectedSide, count } = await req.json();
    // const pyramid = await Pyramid.findOne({});
    // const stone = pyramid[selectedRow][selectedSide];
    // return new Response(JSON.stringify(stone), { status: 200 });

    return new Response('asdasd', { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response('Произошла ошибка, повторите попытку позже', { status: 500 });
  }
};
