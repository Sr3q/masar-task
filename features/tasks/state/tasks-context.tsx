"use client";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Task, Priority } from "../types";

export type Filter = "all" | "done" | "todo";

type TasksContextType = {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  filter: Filter;
  setFilter: (f: Filter) => void;
  add: (title: string, priority: Priority) => Promise<void>;
  toggle: (id: string, done: boolean) => Promise<void>;
  edit: (id: string, title: string) => Promise<void>;
  remove: (id: string) => Promise<void>;
  reload: (f?: Filter) => Promise<void>;
};

const TasksContext = createContext<TasksContextType | null>(null);

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async (f: Filter) => {
    setLoading(true);
    setError(null);
    try {
      const q = f === "all" ? "" : `?status=${f}`;
      const r = await fetch(`/api/tasks${q}`, { cache: "no-store" });
      const j = await r.json();
      setTasks(j.data ?? []);
    } catch (e: any) {
      setError(e?.message ?? "Failed to load");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load(filter);
  }, [filter, load]);

  const add = useCallback(
    async (title: string, priority: Priority) => {
      await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, priority }),
      });
      await load(filter);
    },
    [filter, load]
  );

  const toggle = useCallback(
    async (id: string, done: boolean) => {
      await fetch("/api/tasks", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, done }),
      });
      await load(filter);
    },
    [filter, load]
  );

  const edit = useCallback(
    async (id: string, title: string) => {
      await fetch("/api/tasks", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, title }),
      });
      await load(filter);
    },
    [filter, load]
  );

  const remove = useCallback(
    async (id: string) => {
      await fetch(`/api/tasks?id=${id}`, { method: "DELETE" });
      await load(filter);
    },
    [filter, load]
  );

  const value = useMemo(
    () => ({
      tasks,
      loading,
      error,
      filter,
      setFilter,
      add,
      toggle,
      edit,
      remove,
      reload: (f?: Filter) => load(f ?? filter),
    }),
    [tasks, loading, error, filter, load, add, toggle, edit, remove]
  );
  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error("useTasks must be used within <TasksProvider>");
  return ctx;
}
