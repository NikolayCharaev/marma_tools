import { Schema, models, model } from 'mongoose';

const RepairsSchema = new Schema({
  applicationName: {
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

const Repair = models.Repair || model('Repair', RepairsSchema);

export default Repair;
