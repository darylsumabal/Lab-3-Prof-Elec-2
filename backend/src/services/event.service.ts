import { date } from "zod";
import EventModel from "../models/event.model";
import appAssert from "../utils/appAssert";
import { NOT_FOUND } from "../constants/http";
import UserModel from "../models/user.model";
import UserEventModel from "../models/user.event.model";

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
  const event = await EventModel.findById(id);

  appAssert(event, NOT_FOUND, "Event not found");

  const eventId = event._id;

  const user = await UserEventModel.create({
    eventId,
    name: data.name,
    email: data.email,
  });

  return {
    user,
  };
};
