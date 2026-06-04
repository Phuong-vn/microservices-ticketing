import mongoose from 'mongoose';

interface OrderAttrs {
  userId: string;
  ticketId: string;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc
}

interface OrderDoc extends mongoose.Document {
  userId: string;
  ticketId: string;
}

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  ticketId: {
    type: String,
    required: true,
  },
});

orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export { Order };
