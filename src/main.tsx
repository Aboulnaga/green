import React from "react";
import ReactDOM from "react-dom/client";
import { publicRoute } from "./Routes/publicRoute.tsx";
import { ShopRoute } from "./Routes/ShopRoute.tsx";
import { dashboardRoute } from "./Routes/dashboardRoute.tsx";
import { adminRoute } from "./Routes/adminRoute.tsx";
import { errorsRoute } from "./Routes/errorsRoute.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import LocalContextProvider from "./Providers/LocalContextProvider.tsx";
import LocalHelmetProvider from "./Providers/LocalHelmetProvider.tsx";
import UseQueryProvider from "./Providers/UseQueryProvider.tsx";

const router = createBrowserRouter([
  ...publicRoute,
  ...ShopRoute,
  ...dashboardRoute,
  ...adminRoute,
  ...errorsRoute,
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UseQueryProvider>
      <LocalContextProvider>
        <LocalHelmetProvider>
          <RouterProvider router={router} />
        </LocalHelmetProvider>
      </LocalContextProvider>
    </UseQueryProvider>
  </React.StrictMode>
);
