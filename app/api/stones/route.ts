import { connectDB } from '@/utils/database';
import Pyramid from '@/models/leftovers';

export const POST = async (req: any) => {
  const { stoneType, width, height, selectedRow, selectedSide, imageUrl, thickness, date } =
    await req.json();
  try {
    await connectDB();
    let existingPyramid = await Pyramid.findOne({});
    // // Обновляем соответствующий массив в зависимости от выбранного ряда и стороны
    existingPyramid.rows[selectedRow].push({
      stoneType: stoneType,
      width: width,
      height: height,
      imageUrl: imageUrl,
      thickness: thickness,
      selectedRow: selectedRow + 1,
      date: date,
    });

    // // Сохраняем обновленный объект Pyramid в базе данных
    await existingPyramid.save();

    return new Response('Все супер', { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response('Ошибка сервера' + err, { status: 500 });
  }
};
export const GET = async () => {
  await connectDB();
  try {
    // @ts-ignore
    const exists = await Pyramid.exists();
    if (!exists) {
      const newPyramid = new Pyramid({
        rows: [
          [], // Пустой первый ряд
          [], // Пустой второй ряд
          [], // Пустой третий ряд
          [], // Пустой четвертый ряд
          [], // Пустой пятый ряд
        ],
      });
      await newPyramid.save();
    }

    const allPost = await Pyramid.find();
    return new Response(JSON.stringify(allPost), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response('Произошла ошибка', { status: 500 });
  }
};
