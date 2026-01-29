import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import SecondHero from "./pages/landingPage.jsx";
import StudentRegister from "./auth/student/StudentRegister.jsx";
import Notfound from "./pages/NotFound.jsx";
import App from "./App.jsx";
import InstitutionRegister from "./auth/student/InstitutionRegister.jsx";
import UserLogin from "./auth/student/userLogin.jsx";
import OrganizationRegister from "./auth/student/OrganizationRegister.jsx";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <SecondHero />,
    errorElement: <Notfound />,
  },
  {
    path: "/student-register",
    element: <StudentRegister />,
  },
  {
    path: "/institution-register",
    element: <InstitutionRegister />,
  },
  {
    path: "/user-login",
    element: <UserLogin />,
  },
  {
    path: "/organization-register",
    element: <OrganizationRegister />,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={Routes} />
  </StrictMode>,
);
