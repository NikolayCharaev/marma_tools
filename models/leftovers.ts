import { Schema, models, model } from 'mongoose';

const stoneSchema = new Schema({
  stoneType: {
    // тип камня
    type: String,
    required: true,
  },
  width: {
    // длинна камня
    type: Number,
    required: true,
  },
  height: {
    // высота камня
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
  },

  thickness : {   // толщина камня
    type : String
  }
});

const pyramidSchema = new Schema({
  rowOne: {
    right: [stoneSchema],
  },
  rowTwo: {
    left: [stoneSchema],
    right: [stoneSchema],
  },
  rowThree: {
    left: [stoneSchema],
    right: [stoneSchema],
  },
  rowFour: {
    left: [stoneSchema],
    right: [stoneSchema],
  },
  rowFive: {
    left: [stoneSchema],
  },
});

// Проверяем существование модели перед компиляцией
const Pyramid = models.Pyramid || model('Pyramid', pyramidSchema);

export default Pyramid;
