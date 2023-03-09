import React, { useState } from "react";
import Form from "./components/form";
import ModalDisplay from "./components/modal";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import Root from "./components/root";
import Login from "./components/login";
import Auth from "./components/auth";
import ErrorPage from "./components/error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "",
        element: <ModalDisplay />,
      },
      {
        path: "admin",
        element: <Form />,
      },
      {
        path: "todo/authenticate",
        element: <Auth />,
      },
      {
        path: "*",
        element: <ErrorPage/>,
      },
    ],
  },
]);
export default function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}