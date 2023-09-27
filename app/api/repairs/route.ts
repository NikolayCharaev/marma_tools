import { connectDB } from '@/utils/database';
import Repair from '@/models/repairs';
export const GET = async () => {
  await connectDB();
  try {
    const allPosts = await Repair.find({});
    if (!allPosts) {
      return new Response('постов нет', { status: 400 });
    }
    return new Response(JSON.stringify(allPosts), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response('Прозошла ошибка на сервере', { status: 500 });
  }
};

export const POST = async (req : any) => {
  await connectDB();
  try {
    const { more, imageUrl, date, applicationName } = await req.json();

    const newApplication = new Repair({
      applicationName,
      more,
      imageUrl,
      date,
    });

    await newApplication.save();

    return new Response(newApplication, { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response('Прозошла ошибка на сервере', { status: 500 });
  }
};
