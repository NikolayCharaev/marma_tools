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

const Pyramid = models.Pyramid || model('Pyramid', pyramidSchema);

export default Pyramid;