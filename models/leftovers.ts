import { Schema, models, model } from 'mongoose';

const stoneSchema = new Schema({
  stoneType: {
    type: String,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  thickness: {
    type: String,
  },
  selectedRow : { 
    type : Number
  }
});

const pyramidSchema = new Schema({
  rows: [[stoneSchema]], // Вложенный массив для представления рядов
});

const Pyramid = models.Pyramid || model('Pyramid', pyramidSchema);

export default Pyramid;