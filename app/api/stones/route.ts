import { connectDB } from '@/utils/database';
import Pyramid from '@/models/leftovers';

export const POST = async (req, res) => {
  const { stoneType, width, height, selectedRow, selectedSide, imageUrl } = await req.json();

  try {
    await connectDB();

    // Проверяем, существует ли объект Pyramid в базе данных
    let existingPyramid = await Pyramid.findOne();

    if (!existingPyramid) {
      // Если объект Pyramid не существует, создаем новый объект с пустыми массивами
      existingPyramid = new Pyramid({
        rowOne: { right: [] },
        rowTwo: { left: [], right: [] },
        rowThree: { left: [], right: [] },
        rowFour: { left: [], right: [] },
        rowFive: { left: [] },
      });
    }

    // Обновляем соответствующий массив в зависимости от выбранного ряда и стороны
    existingPyramid[selectedRow][selectedSide].push({
      stoneType: stoneType,
      width: width,
      height: height,
      imageUrl: imageUrl,
    });

    // Сохраняем обновленный объект Pyramid в базе данных
    await existingPyramid.save();

    return new Response(existingPyramid, { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response('Ошибка сервера', { status: 500 });
  }
};
export const GET = async (req) => {
  try {
    await connectDB();
    const allStones = await Pyramid.find({});
    const result = JSON.stringify(allStones);
    return new Response(result, { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response('Произошла ошибка при получении остатков камней', { status: 500 });
  }
};

// export const GET = async (req) => {
//   try {
//     await connectDB();
//     const allStones = await Pyramid.find({}).lean(); // Добавляем метод lean() для конвертации в обычные JavaScript-объекты
//     return new Response(allStones, { status: 200 });
//   } catch (err) {
//     console.log(err);
//     return new Response('Произошла ошибка при получении остатков камней', { status: 500 });
//   }
// };
