import mongoose from 'mongoose';

interface OrderAttrs {
  userId: string;
  ticket: string;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc
}

interface OrderDoc extends mongoose.Document {
  userId: string;
  ticket: string;
}

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  ticket: {
    type: String,
    required: true,
  },
});

orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export { Order };
