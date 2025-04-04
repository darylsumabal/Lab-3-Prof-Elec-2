import { z } from "zod";

export const eventSchema = z.object({
  title: z
    .string()
    .min(1, {
      message: "Please input an event",
    })
    .max(255),
  date: z.string().min(1),
  organizer: z
    .string()
    .min(1, {
      message: "Please input an organizer",
    })
    .max(255),
});

export const registerUserEventSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Please input a name",
    })
    .max(255),
  email: z
    .string()
    .email()
    .min(1, {
      message: "Please input a email",
    })
    .max(255),
});
