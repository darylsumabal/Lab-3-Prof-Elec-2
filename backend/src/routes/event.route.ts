import { Router } from "express";
import {
  deleteEventHandler,
  eventHandler,
  getAttendeesEventHandler,
  getEventHandler,
  getSpecificEventHandler,
  registerUserEventHandler,
  updateEventHandler,
} from "../controllers/event.controller";

const eventRoutes = Router();

//prefix: /events
eventRoutes.post("/", eventHandler);
eventRoutes.get("/", getEventHandler);
eventRoutes.get("/:id", getSpecificEventHandler);
eventRoutes.put("/:id", updateEventHandler);
eventRoutes.delete("/:id", deleteEventHandler);
eventRoutes.post("/:eventId/register/user/", registerUserEventHandler);
eventRoutes.get("/:eventId/registration", getAttendeesEventHandler);
export default eventRoutes;
