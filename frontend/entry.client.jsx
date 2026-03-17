import React from "react";
import { hydrateRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { router } from "./router.client.jsx"; 

const container = document.getElementById("react-app");

if (container) {
    hydrateRoot(container, <RouterProvider router={router} />);
} else {
    console.error("Could not find element #react-app");
}