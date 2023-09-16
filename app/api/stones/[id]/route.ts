import Pyramid from '@/models/leftovers';
import { connectDB } from '@/utils/database';

// export const GET = async (req, { params }: any) => {
//     await connectDB();
//     // const {stoneType} = await req.json()
//     // console.log('NAME',stoneType)
//     try {
//       console.log("ID",params.id)
//     //   const result = await Pyramid.find({_id: params.id});
//     //     const result = ''
//     //   if (result) {
//     //     return new Response(result, { status: 200 });
//     //   } else {
//     //     return new Response('Элемент не найден', { status: 404 });
//     //   }
//     } catch (err) {
//       console.log(err);
//       return new Response('Произошла ошибка, повторите попытку позже', { status: 500 });
//     }
//   };

export const GET = async (req, { params }) => {
  await connectDB();
  try {
    console.log(params);
    return new Response('Успешно выполнен GET запрос', { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response('Произошла ошибка, повторите попытку позже', { status: 500 });
  }
};