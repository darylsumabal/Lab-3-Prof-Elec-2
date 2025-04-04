import mongoose from "mongoose";

interface UserEvent extends mongoose.Document {
  eventId: mongoose.Types.ObjectId;
  name: string;
  email: string;
  expiresAt: Date;
  createAt: Date;
}

const userEventSchema = new mongoose.Schema<UserEvent>(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
      index: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const UserEventModel = mongoose.model<UserEvent>(
  "UserEvent",
  userEventSchema,
  "user_event"
);

export default UserEventModel;
