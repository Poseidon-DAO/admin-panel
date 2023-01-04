import { Theme } from "@mui/material";

import Card from "./Card";
import Paper from "./Paper";
import Input from "./Input";
import Button from "./Button";
import Tooltip from "./Tooltip";
import Typography from "./Typography";
import CssBaseline from "./CssBaseline";

export default function ComponentsOverrides(theme: Theme) {
  return Object.assign(
    CssBaseline(),
    Paper(),

    Card(theme),
    Input(theme),
    Button(theme),
    Tooltip(theme),
    Typography(theme)
  );
}
