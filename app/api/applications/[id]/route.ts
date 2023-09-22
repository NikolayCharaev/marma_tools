import { connectDB } from '@/utils/database';
import Application from '@/models/applications';

export const DELETE = async (req, { params }) => {
  await connectDB();
  try {
    const postId = await params.id;
    const deletedPost = await Application.findByIdAndDelete(postId);

    if (deletedPost) {
      return new Response('Пост удален', { status: 200 });
    }
  } catch (err) {
    console.log(err);
    return new Response('Произошла ошибка на сервере', { status: 500 });
  }
};
