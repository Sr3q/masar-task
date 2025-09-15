import { promises as fs } from "fs";
import path from "path";
import type { Task } from "../features/tasks/types";

const dataDir = path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "tasks.json");

async function ensureFile() {
  try {
    await fs.mkdir(dataDir, { recursive: true });
    await fs.access(dataFile);
  } catch {
    const seed = { tasks: [] as Task[] };
    await fs.writeFile(dataFile, JSON.stringify(seed, null, 2), "utf8");
  }
}

export async function readTasks(): Promise<Task[]> {
  await ensureFile();
  const raw = await fs.readFile(dataFile, "utf8");
  const json = JSON.parse(raw) as { tasks: Task[] };
  return json.tasks ?? [];
}

export async function writeTasks(tasks: Task[]) {
  await ensureFile();
  const json = { tasks };
  await fs.writeFile(dataFile, JSON.stringify(json, null, 2), "utf8");
}
