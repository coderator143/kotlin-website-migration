import React from "react";
import { hydrateRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { router } from "./router.client";

hydrateRoot(
  document.getElementById("react-app"),
  <RouterProvider router={router} />
);