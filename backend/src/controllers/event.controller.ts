import { z } from "zod";
import { NOT_FOUND, OK } from "../constants/http";
import EventModel from "../models/event.model";
import {
  createEvent,
  registerUserEvent,
  updateEvent,
} from "../services/event.service";
import appAssert from "../utils/appAssert";
import catchError from "../utils/catchError";
import { eventSchema, registerUserEventSchema } from "./event.schema";
import UserEventModel from "../models/user.event.model";

//create event
export const eventHandler = catchError(async (req, res) => {
  const request = eventSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { event } = await createEvent(request);

  return res.status(OK).json({
    success: true,
    data: event,
    message: "Event created successfully!",
  });
});

//retrieve all event
export const getEventHandler = catchError(async (_, res) => {
  const events = await EventModel.find();

  appAssert(events, NOT_FOUND, "No events found");

  return res.status(OK).json(events);
});

//retrieve specific event
export const getSpecificEventHandler = catchError(async (req, res) => {
  const eventId = z.string().parse(req.params.id);

  const event = await EventModel.findById(eventId);

  appAssert(event, NOT_FOUND, "Event not found!");

  return res.status(OK).json(event);
});

//update specific event
export const updateEventHandler = catchError(async (req, res) => {
  const eventId = z.string().parse(req.params.id);

  const event = await updateEvent(eventId, req.body);

  return res.status(OK).json({
    data: event,
    message: "Event updated",
  });
});

// delete specific event
export const deleteEventHandler = catchError(async (req, res) => {
  const eventId = z.string().parse(req.params.id);

  const deleteEvent = await EventModel.findOneAndDelete({
    _id: eventId,
  });

  appAssert(deleteEvent, NOT_FOUND, "Event not found!");

  return res.status(OK).json({
    message: "Event removed",
  });
});

//register user for an event
export const registerUserEventHandler = catchError(async (req, res) => {
  const eventId = z.string().parse(req.params.eventId);

  const request = registerUserEventSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  const { user } = await registerUserEvent(eventId, request);

  return res.status(OK).json({
    data: user,
    message: "User register successfully in an event",
  });
});

// retrieve all the attendees in an  specific event
export const getAttendeesEventHandler = catchError(async (req, res) => {
  const eventId = z.string().parse(req.params.eventId);

  const attendees = await UserEventModel.find({
    eventId: eventId,
  });

  return res.status(OK).json(attendees);
});
