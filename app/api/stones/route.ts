import { connectDB } from '@/utils/database';
import Pyramid from '@/models/leftovers';

export const POST = async (req : any) => {
  const { stoneType, width, height, selectedRow, selectedSide, imageUrl, thickness } =
    await req.json();
  try {
    await connectDB();
    let existingPyramid = await Pyramid.findOne({});
    if (!existingPyramid) {
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
      thickness: thickness,
    });

    // Сохраняем обновленный объект Pyramid в базе данных
    await existingPyramid.save();

    return new Response(existingPyramid, { status: 200 });
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
        rowOne: { right: [] },
        rowTwo: { left: [], right: [] },
        rowThree: { left: [], right: [] },
        rowFour: { left: [], right: [] },
        rowFive: { left: [] },
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


