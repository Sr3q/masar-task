import { Container, Stack, Typography, Paper } from "@mui/material";
import TaskForm from "../../features/tasks/components/TaskForm";
import TaskList from "../../features/tasks/components/TaskList";
import FilterBar from "../../features/tasks/components/FilterBar";
import { TasksProvider } from "../../features/tasks/state/tasks-context";

export default function Page() {
  return (
    <TasksProvider>
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Stack spacing={3}>
          <Stack spacing={0.5}>
            <Typography variant="h4" fontWeight={800}>
              Task Manager
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Add tasks, mark them done, filter, edit, and delete.
            </Typography>
          </Stack>
          <Paper variant="outlined" sx={{ p: 2.5 }}>
            <TaskForm />
          </Paper>
          <FilterBar />
          <TaskList />
        </Stack>
      </Container>
    </TasksProvider>
  );
}
