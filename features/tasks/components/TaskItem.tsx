"use client";
import { useState } from "react";
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Task } from "../types";
import { useTasks } from "../state/tasks-context";

function priorityColor(p: Task["priority"]) {
  switch (p) {
    case "high":
      return "error";
    case "medium":
      return "info";
    case "low":
      return "success";
  }
}

export default function TaskItem({ task }: { task: Task }) {
  const { toggle, edit, remove } = useTasks();
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(task.title);
  const save = async () => {
    const t = text.trim();
    if (t && t !== task.title) await edit(task.id, t);
    setEditing(false);
  };

  return (
    <ListItem
      divider
      secondaryAction={
        <Stack direction="row" spacing={0.5}>
          <Chip
            size="small"
            label={task.priority}
            color={priorityColor(task.priority)}
            variant="outlined"
          />
          <Tooltip title={editing ? "Save" : "Edit"}>
            <IconButton
              edge="end"
              onClick={() => (editing ? save() : setEditing(true))}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton edge="end" onClick={() => remove(task.id)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      }
    >
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={task.done}
          onChange={(e) => toggle(task.id, e.target.checked)}
          tabIndex={-1}
        />
      </ListItemIcon>
      {editing ? (
        <TextField
          size="small"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={save}
          onKeyDown={(e) => {
            if (e.key === "Enter") save();
            if (e.key === "Escape") {
              setText(task.title);
              setEditing(false);
            }
          }}
          fullWidth
          autoFocus
        />
      ) : (
        <ListItemText
          primary={task.title}
          sx={{
            textDecoration: task.done ? "line-through" : "none",
            opacity: task.done ? 0.6 : 1,
          }}
        />
      )}
    </ListItem>
  );
}
