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
  `toggleTask`, `deleteTask`); passes them down as props. Tasks are persisted to `localStorage` via
  `src/storage.ts` (loaded lazily as initial state, saved on every change through a `useEffect`).
- `src/components/` — `TaskForm` (controlled input, calls `onAdd`), `TaskList` (renders `TaskItem`s
  or an empty-state message), `TaskItem` (checkbox + text + delete button; applies the
  `task-item-completed` class for completed tasks).
- `src/types.ts` — the shared `Task` interface (`id`, `text`, `completed`).
- Styling is plain CSS (`src/index.css` for global tokens/light-dark theme variables,
  `src/App.css` for task-board-specific styles) — no CSS framework.

## 技術スタック

- フレームワーク: React 19(関数コンポーネント + Hooksのみ、クラスコンポーネントは使わない)
- 言語: TypeScript
- ビルドツール: Vite(`@vitejs/plugin-react`)
- Lint: Oxlint(`npm run lint`)
- スタイリング: プレーンCSS(CSSフレームワーク・CSS-in-JSは未使用)
- 状態管理: Reactの`useState`/`useEffect`のみ(Redux等の外部状態管理ライブラリは未使用)
- データ永続化: ブラウザの`localStorage`(バックエンド・DBは無し)
- デプロイ: GitHub Actions経由でGitHub Pagesへ公開

## コンポーネントの命名規則

- コンポーネントファイルは`src/components/`配下にPascalCaseで配置し、1ファイル1コンポーネントとする。ファイル名・`export default`する関数名・コンポーネント名を一致させる(例: `TaskForm.tsx` → `function TaskForm`)。
- Propsの型は`<コンポーネント名>Props`という名前のinterfaceとして定義する(例: `TaskFormProps`、`TaskItemProps`)。
- 子から親へ渡すイベントハンドラのprop名は`on`+動詞とする(例: `onAdd`、`onToggle`、`onDelete`)。それを受けて実際に状態を更新する親側の関数は、動詞+対象名とする(例: `addTask`、`toggleTask`、`deleteTask`)。
- CSSクラス名はkebab-caseとし、`task-`プレフィックスの後にコンポーネント名・要素名を続ける(例: `task-board`、`task-form`、`task-item`、`task-item-completed`、`task-delete-button`)。BEMのような厳密な記法は使わず、意味の分かる単語をハイフンでつなぐ簡潔な命名に統一する。

## GitHubリポジトリ

https://github.com/Ryoji-A/task-board.git

## Deployment

Deployed to GitHub Pages at https://ryoji-a.github.io/task-board/ via
`.github/workflows/deploy.yml`, which builds and publishes `dist/` on every push to `main`
(requires the repo's Settings → Pages → Build and deployment → Source to be set to "GitHub
Actions"). `vite.config.ts` sets `base: '/task-board/'` to match the Pages sub-path — update it if
the repo is ever renamed.

## Git workflow rules

- This project's code is tracked in Git and pushed to GitHub (remote `origin`: the repository above).
- **Every time code is changed, commit the change and push it to GitHub.** Do not leave changes
  committed locally only — after making and verifying a change, stage it, commit it with a clear
  message, and push to the remote (`origin`) right away.
- Keep commits scoped to the change being made; avoid bundling unrelated changes into one commit/push.
- Do not force-push, rewrite history, or skip commit hooks unless explicitly instructed to.
