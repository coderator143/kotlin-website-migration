import React from "react";
import { ThemeProvider } from '@rescui/ui-contexts';
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <ThemeProvider theme="dark">
      <Outlet />
    </ThemeProvider>
  );
}