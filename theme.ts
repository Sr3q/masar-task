"use client";
import { createTheme } from "@mui/material/styles";
export const theme = createTheme({
  direction: "ltr",
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Roboto",
      "Helvetica",
      "Arial",
      "sans-serif",
      "Apple Color Emoji",
      "Segoe UI Emoji",
    ].join(","),
  },
  palette: {
    mode: "light",
    primary: { main: "#1976d2" },
    background: { default: "#f8fafc" },
  },
  shape: { borderRadius: 12 },
});
