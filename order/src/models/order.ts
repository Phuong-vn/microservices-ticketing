import mongoose from 'mongoose';
import { OrderStatus } from '@doffy-gittix/common';
import type { TicketDoc } from './ticket.ts';

interface OrderAttrs {
  userId: string;
  status: OrderStatus;
  expiredAt: Date;
  ticket: TicketDoc;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

interface OrderDoc extends mongoose.Document {
  userId: string;
  status: OrderStatus;
  expiredAt: Date;
  ticket: TicketDoc;
}

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: Object.values(OrderStatus),
  },
  expiredAt: {
    type: mongoose.Schema.Types.Date,
  },
  ticket: {
    type: mongoose.Schema.ObjectId,
    ref: 'Ticket',
  },
});

orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export { Order };
