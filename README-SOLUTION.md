# README-SOLUTION

## 1) Code Structure — What & Why

app/
(tasks)/page.tsx ← Tasks feature page (assembles UI)
api/tasks/route.ts ← REST API (GET/POST/PATCH/DELETE)
layout.tsx / providers.tsx ← Theme + CssBaseline (MUI)
theme.ts ← MUI theme configuration
features/
tasks/
components/
TaskForm.tsx ← Add task + priority
TaskList.tsx ← List + loading/error states
TaskItem.tsx ← Single item (edit/delete/toggle)
FilterBar.tsx ← Filters: All / Done / Todo
state/
tasks-context.tsx ← TasksProvider + useTasks() (shared state)
types.ts ← Task/Priority types
lib/
storage.ts ← File-based JSON storage (no DB)

**Why this organization?**

- **Feature-based**: Each feature owns its UI, state, and types → easy to assign, scale, and maintain.
- **Single source of truth** via `TasksProvider` (Context) → all components react to the same state (filter/tasks).
- **Separation of concerns**: API in `/app/api/tasks`, persistence in `lib/storage.ts` → easy to swap storage (KV/DB) later.
- **MUI**: Fast, consistent UI with theming and accessibility support.

---

## 2) Team Delegation — 2–3 Engineers

**A) Tech Lead / Full-Stack**

- Define API contract & implement `app/api/tasks/route.ts` (CRUD + filter).
- Implement persistence `lib/storage.ts` and set `runtime = "nodejs"`.
- Own `theme.ts` and `app/providers.tsx`; enforce code standards and PR reviews.

**B) Frontend Feature Owner (Tasks)**

- Build MUI components: `TaskForm`, `TaskList`, `TaskItem`, `FilterBar`.
- Integrate with shared state via `useTasks()` from `tasks-context.tsx`.
- Polish accessibility and empty/loading/error states.

**C) Product-minded / QA**

- UX polish: clear messages, simple toasts, priority badges, minor animations.
- Basic tests (unit/E2E if time permits).
- Short documentation of shipped features + next steps (Import/Export JSON, Reorder, Optimistic Updates).

> Working agreement: small PRs (<200 LOC), type-safe, handles loading/error states, and runs locally with `npm run dev`.
