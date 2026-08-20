# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Vite dev server (http://localhost:5173)
- `npm run build` — type-check (`tsc -b`) and build for production
- `npm run lint` — run Oxlint
- `npm run preview` — preview the production build locally

## Architecture

A single-page task board built with React 19 + TypeScript + Vite.

- `src/App.tsx` — owns all task state (`useState<Task[]>`) and the CRUD handlers (`addTask`,
  `toggleTask`, `deleteTask`); passes them down as props. State is in-memory only (no persistence).
- `src/components/` — `TaskForm` (controlled input, calls `onAdd`), `TaskList` (renders `TaskItem`s
  or an empty-state message), `TaskItem` (checkbox + text + delete button; applies the
  `task-item-completed` class for completed tasks).
- `src/types.ts` — the shared `Task` interface (`id`, `text`, `completed`).
- Styling is plain CSS (`src/index.css` for global tokens/light-dark theme variables,
  `src/App.css` for task-board-specific styles) — no CSS framework.

## GitHubリポジトリ

https://github.com/Ryoji-A/task-board.git

## Git workflow rules

- This project's code is tracked in Git and pushed to GitHub (remote `origin`: the repository above).
- **Every time code is changed, commit the change and push it to GitHub.** Do not leave changes
  committed locally only — after making and verifying a change, stage it, commit it with a clear
  message, and push to the remote (`origin`) right away.
- Keep commits scoped to the change being made; avoid bundling unrelated changes into one commit/push.
- Do not force-push, rewrite history, or skip commit hooks unless explicitly instructed to.
