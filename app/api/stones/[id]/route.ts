import Pyramid from '@/models/leftovers';
import { connectDB } from '@/utils/database';
export const DELETE = async (req, { params }) => {
  await connectDB();

  try {
    const { selectedRow, selectedSide, index } = await req.json();

    const pyramid = await Pyramid.findOne({});

    const test = pyramid[selectedRow][selectedSide];

    // Удаление выбранного элемента
    test.splice(index, 1);
    // Сохранение изменений в базе данных
    await pyramid.save();

    return new Response('Элемент успешно удален', { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response('Произошла ошибка, повторите попытку позже', { status: 500 });
  }
};
