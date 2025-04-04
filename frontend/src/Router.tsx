import { createBrowserRouter } from "react-router-dom";
import AppContainer from "./components/AppContainer";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import Settings from "./pages/Settings";
import VerifyEmail from "./pages/VerifyEmail";
import Event from "./pages/Event";
import ViewEvent from "./pages/ViewEvent";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppContainer />,
    children: [
      {
        index: true,
        element: <Profile />,
      },
      {
        path: "event",
        element: <Event />,
      },
      {
        path: "event/:eventId",
        element: <ViewEvent />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/email/verify/:code",
    element: <VerifyEmail />,
  },
  {
    path: "/password/forgot",
    element: <ForgotPassword />,
  },
  {
    path: "/password/reset",
    element: <ResetPassword />,
  },
]);

// 3;35
