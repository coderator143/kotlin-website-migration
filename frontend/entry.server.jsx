import React from "react";
import { renderToString } from "react-dom/server";

import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider
} from "react-router";

import { routes } from "./router";

export async function render(url) {
  const handler = createStaticHandler(routes);

  const context = await handler.query(
    new Request("http://localhost" + url)
  );

  const router = createStaticRouter(routes, context);

  return renderToString(
    <StaticRouterProvider router={router} context={context} />
  );
}