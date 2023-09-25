import { connectDB } from '@/utils/database';
// import Re from '@/models/applications';
import Repair from '@/models/repairs';

export const DELETE = async (req, { params }) => {
  await connectDB();
  try {
    const postId = await params.id;
    const deletedPost = await Repair.findByIdAndDelete(postId);

    if (deletedPost) {
      return new Response('Пост удален', { status: 200 });
    }
  } catch (err) {
    console.log(err);
    return new Response('Произошла ошибка на сервере', { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  await connectDB();
  const { more, date, imageUrl, applicationName, id } = await req.json();
  try {
    const onePost = await Repair.findById(id);
    if (!onePost) {
      return new Response('Пост не найден', { status: 404 });
    }
    onePost.applicationName = applicationName;
    onePost.imageUrl = imageUrl;
    onePost.date = date;
    onePost.more = more;
    await onePost.save();
    return new Response('успешный успех', { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response('Произошла ошибка на сервере', { status: 500 });
  }
};
