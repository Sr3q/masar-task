"use client";
import { ToggleButtonGroup, ToggleButton, Stack } from "@mui/material";
import { useTasks, type Filter } from "../state/tasks-context";

export default function FilterBar() {
  const { filter, setFilter } = useTasks();
  const handle = (_: any, v: Filter | null) => {
    if (v) setFilter(v);
  };
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <ToggleButtonGroup
        exclusive
        value={filter}
        onChange={handle}
        size="small"
      >
        <ToggleButton value="all">All</ToggleButton>
        <ToggleButton value="todo">Not Done</ToggleButton>
        <ToggleButton value="done">Done</ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
}
