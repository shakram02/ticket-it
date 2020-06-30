import mongoose, { Document } from 'mongoose';

export interface IEvent extends Document{
    name: String
    insertedAt: Date
    computeRevenue: () => Number
}
export const eventSchema = new mongoose.Schema<IEvent>({
  name: String,
  insertedAt: { type: Date, default: Date.now },
});

// eslint-disable-next-line func-names
eventSchema.methods.computeRevenue = function () {
  const number = 1;
  return number;
};

export const Event = mongoose.model<IEvent>('Event', eventSchema);
