import { NextRequest, NextResponse } from "next/server";
import { readTasks, writeTasks } from "../../../lib/storage";
import type { Task } from "../../../features/tasks/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Priority = Task["priority"];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");

  const tasks = await readTasks();

  const filtered = tasks.filter((t) => {
    if (status === "done") return t.done;
    if (status === "todo") return !t.done;
    return true;
  });

  return NextResponse.json({ data: filtered });
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body.title !== "string" || !body.title.trim())
    return NextResponse.json({ error: "title is required" }, { status: 400 });

  const title = body.title.trim();
  const priority: Priority = ["low", "medium", "high"].includes(body.priority)
    ? body.priority
    : "medium";

  const tasks = await readTasks();
  const now = new Date().toISOString();
  const id =
    globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2);
  const task: Task = {
    id,
    title,
    done: false,
    priority,
    createdAt: now,
    updatedAt: now,
  };

  tasks.unshift(task);
  await writeTasks(tasks);

  return NextResponse.json({ data: task }, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body.id !== "string")
    return NextResponse.json({ error: "id is required" }, { status: 400 });

  const tasks = await readTasks();
  const idx = tasks.findIndex((t) => t.id === body.id);
  if (idx === -1)
    return NextResponse.json({ error: "not found" }, { status: 404 });

  const prev = tasks[idx];
  const updated: Task = {
    ...prev,
    title: typeof body.title === "string" ? body.title : prev.title,
    done: typeof body.done === "boolean" ? body.done : prev.done,
    priority: (["low", "medium", "high"].includes(body.priority)
      ? body.priority
      : prev.priority) as Priority,
    updatedAt: new Date().toISOString(),
  };
  tasks[idx] = updated;

  await writeTasks(tasks);
  return NextResponse.json({ data: updated });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id)
    return NextResponse.json({ error: "id is required" }, { status: 400 });

  const tasks = await readTasks();
  const next = tasks.filter((t) => t.id !== id);

  if (next.length === tasks.length)
    return NextResponse.json({ error: "not found" }, { status: 404 });
  await writeTasks(next);

  return NextResponse.json({ ok: true });
}
