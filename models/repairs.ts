import { Schema, models, model } from 'mongoose';

const RepairsSchema = new Schema({
  repairName: {
    type: String,
    required: [true, 'введите название'],
  },
  more: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  date: {
    type: String,
  },
});

const Repair = models.Application || model('Application', RepairsSchema);

export default Repair;
