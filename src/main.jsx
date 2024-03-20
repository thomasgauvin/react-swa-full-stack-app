import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Items from "./pages/Items/ItemsPage.jsx";
import CreateItemsPage from "./pages/Items/CreateItemsPage.jsx";
import EditItemsPage from "./pages/Items/EditItemsPage.jsx";
import SalesPage from "./pages/Sales/SalesPage.jsx";
import CreateSalesPage from "./pages/Sales/CreateSalesPage.jsx";
import EditSalesPage from "./pages/Sales/EditSalesPage.jsx";
import OverviewPage from "./pages/Home/OverviewPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <OverviewPage />,
  },
  {
    path: "/items",
    element: <Items />,
  },
  {
    path: "/items/create",
    element: <CreateItemsPage />,
  },
  {
    path: "/items/edit/:id",
    element: <EditItemsPage />,
  },
  {
    path: "/sales",
    element: <SalesPage />,
  },
  {
    path: "/sales/create",
    element: <CreateSalesPage />,
  },
  {
    path: "/sales/edit/:id",
    element: <EditSalesPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
