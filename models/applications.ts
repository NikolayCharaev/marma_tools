import { Schema, models, model } from 'mongoose';

const ApplicationsSchema = new Schema({
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

const Application = models.Application || model('Application', ApplicationsSchema);

export default Application;
