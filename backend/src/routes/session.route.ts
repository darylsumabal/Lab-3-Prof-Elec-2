import { Router } from "express";
import {
  deleteSessionHandler,
  getSessionsHandler,
} from "../controllers/session.controller";

const sessionRoute = Router();

//prefix: /session

sessionRoute.get("/", getSessionsHandler);
sessionRoute.delete("/:id", deleteSessionHandler);

export default sessionRoute;
