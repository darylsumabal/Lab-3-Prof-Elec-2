import mongoose from "mongoose";

export interface EventDocument extends mongoose.Document {
  title: string;
  date: Date;
  organizer: string;
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new mongoose.Schema<EventDocument>(
  {
    title: { type: String, required: true },
    date: { type: Date, required: true },
    organizer: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const EventModel = mongoose.model<EventDocument>("Event", eventSchema);

export default EventModel;


