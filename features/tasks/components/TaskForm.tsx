"use client";
import { useState } from "react";
import {
  Stack,
  TextField,
  Button,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
} from "@mui/material";
import { useTasks } from "../state/tasks-context";
import type { Priority } from "../types";

export default function TaskForm() {
  const { add } = useTasks();
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const t = title.trim();
    if (!t) return;

    setBusy(true);
    try {
      await add(t, priority);
      setTitle("");
      setPriority("medium");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          label="Task title"
          placeholder="Add a task…"
        />
        <FormControl sx={{ minWidth: 160 }}>
          <InputLabel id="priority-label">Priority</InputLabel>
          <Select
            labelId="priority-label"
            label="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          disabled={busy || !title.trim()}
        >
          {busy ? "Adding…" : "Add"}
        </Button>
      </Stack>
    </form>
  );
}
