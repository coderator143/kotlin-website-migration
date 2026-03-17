import React from "react";

import Root from "./routes/root";
import Home from "./routes/Home";

export const routes = [
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />
      }
    ]
  }
];     