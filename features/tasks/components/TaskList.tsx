"use client";
import {
  Alert,
  LinearProgress,
  List,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import TaskItem from "./TaskItem";
import { useTasks } from "../state/tasks-context";

export default function TaskList() {
  const { tasks, loading, error } = useTasks();

  return (
    <Paper variant="outlined">
      {loading && <LinearProgress />}
      <Stack p={2} spacing={1}>
        {error && <Alert severity="error">{error}</Alert>}
        {!loading && tasks.length === 0 ? (
          <Typography color="text.secondary">No tasks yet. Add one!</Typography>
        ) : (
          <List disablePadding>
            {tasks.map((t) => (
              <TaskItem key={t.id} task={t} />
            ))}
          </List>
        )}
      </Stack>
    </Paper>
  );
}
