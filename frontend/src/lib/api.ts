import API from "../config/apiClient";
import { User } from "../hooks/useAuth";
import { EventData, Events } from "../hooks/useEvent";
import { Registers, RegisterData } from "../hooks/useRegister";
import { Sessions } from "../hooks/useSession";

type LoginParams = {
  email: string;
  password: string;
};

type RegisterParams = {
  email: string;
  password: string;
  confirmPassword: string;
};

export const login = async (data: LoginParams) => API.post("/auth/login", data);

export const register = async (data: RegisterParams) =>
  API.post("/auth/register", data);

export const logout = async () => API.get("/auth/logout");

export const verifyEmail = async (verificationCode: string) =>
  API.get(`/auth/email/verify/${verificationCode}`);

export const sendPasswordResetEmail = async (data: { email: string }) =>
  API.post("/auth/password/forgot", data);

export const resetPassword = async (data: {
  password: string;
  verificationCode: string;
}) => API.post("/auth/password/reset", data);

export const getUser = async (): Promise<User> => API.get("/user");

export const getSessions = async (): Promise<Sessions> => API.get("/sessions");

export const deleteSession = (id: string) => API.delete(`/sessions/${id}`);

type EventParams = {
  title: string;
  date: string;
  organizer: string;
};

export const getEvents = async (): Promise<Events> => API.get("/events");

export const createEvent = async (data: EventParams) =>
  API.post("/events", data);

export const getEvent = async (id: string): Promise<EventData> =>
  API.get(`/events/${id}`);

export const editEvent = async (id: string, data: EventData) =>
  API.put(`/events/${id}`, data);

export const deleteEvent = async (id: string) => API.delete(`/events/${id}`);

export const createRegisterUser = async (id: string, data: RegisterData) =>
  API.post(`/events/${id}/register/user/`, data);

export const getRegister = async (id: string):Promise<Registers> =>
  API.get(`/events/${id}/registration`);
