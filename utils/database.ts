import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    console.log('Подключение успешно');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI || 'default-mongodb-uri', {
      dbName: 'marma_tools',
      // @ts-ignore
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log('Подключение успешно');
  } catch (err) {
    console.log(err);
  }
};

