import { date } from "zod";
import EventModel from "../models/event.model";
import appAssert from "../utils/appAssert";
import { CONFLICT, NOT_FOUND } from "../constants/http";
import UserModel from "../models/user.model";
import UserEventModel from "../models/user.event.model";
import mongoose from "mongoose";

export type CreateEventParams = {
  title: string;
  date: string;
  organizer: string;
};

export const createEvent = async (data: CreateEventParams) => {
  const event = await EventModel.create({
    title: data.title,
    date: new Date(data.date),
    organizer: data.organizer,
  });

  return {
    event,
  };
};

export const updateEvent = async (
  id: string,
  req: { title: string; date: Date }
) => {
  const updateEvent = await EventModel.findByIdAndUpdate(
    id,
    {
      $set: req,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  appAssert(updateEvent, NOT_FOUND, "Event not found!");

  return updateEvent;
};

type RegisterUserEventSchema = {
  name: string;
  email: string;
};

export const registerUserEvent = async (
  id: string,
  data: RegisterUserEventSchema
) => {

  appAssert(mongoose.Types.ObjectId.isValid(id), NOT_FOUND, "Invalid event ID");

  const event = await EventModel.findById(id);

  appAssert(event, NOT_FOUND, "Event not found");
  
  const eventId = event._id;

  const existingUser = await UserEventModel.findOne({
    eventId,
    email: data.email,
  });

  appAssert(!existingUser, CONFLICT, "Already registered");

  const newUser = await UserEventModel.create({
    eventId,
    name: data.name,
    email: data.email,
  });

  return {
    message: "User registered successfully",
    user: newUser,
  };
};
