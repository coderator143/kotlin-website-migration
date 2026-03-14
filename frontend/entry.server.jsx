import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";

export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <RouterProvider router={router} />
    </StaticRouter>
  );
}