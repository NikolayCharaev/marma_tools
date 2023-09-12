import { Schema, models, model } from 'mongoose';

const ConsumablesShema = new Schema({ // расходники камня
  imageUrl: {
    type: String,
  },
  count: {
    type: Number,
    required: [true, 'выберите количество'],
  },
});

const Consumable = models.Post || model('consumable', ConsumablesShema);

export default Consumable;
