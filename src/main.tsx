import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import "primeicons/primeicons.css";

import Root from "./routes/root.tsx";
import { Home } from "./pages/home.tsx";
import { NotFound } from "./pages/not-found.tsx";
import { Voxels } from "./pages/voxels/voxels.tsx";
import { UnitCells } from "./pages/unit-cells/unit-cells.tsx";
import { Symmetries } from "./pages/symmetries/symmetries.tsx";
import ErrorPage from "./error-page";
import "./style.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "voxels",
        element: <Voxels />,
      },
      {
        path: "unit-cells",
        element: <UnitCells />,
      },
      {
        path: "symmetries",
        element: <Symmetries />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PrimeReactProvider>
      <RouterProvider router={router} />
    </PrimeReactProvider>
  </React.StrictMode>
);
