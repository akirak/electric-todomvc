# Local-First Todo MVC Demo

This is a todo MVC application with [TanStack
Start](https://tanstack.com/start/latest), [Electric
SQL](https://electric-sql.com/) (on PostgreSQL), and [TanStack
DB](https://tanstack.com/db/latest). It is a local-first application with
real-time synchronization, with data persisted to a remote PostgreSQL server.

While the functionality is totally useless, this repository is intended as my
template for building applications supporting sync, so it is built with an
opinionated up-to-date stack.

## Architecture and tech stack

```mermaid
flowchart LR
  %% Local-First Todo MVC Demo — Container Diagram

  user([User])

  subgraph sys[Todo MVC System]
    web["Web App<br/>React + TanStack Start (Vite)<br/>UI; serves /api/todos proxy; port 3000"]
    api["API Server<br/>Hono + oRPC<br/>CRUD + validation; port 3001 (/db)"]
    electric["ElectricSQL<br/>Service/Container<br/>Realtime shapes + sync; port 3102"]
    pg[("PostgreSQL<br/>Relational DB (5437)<br/>App data; logical replication enabled")]
  end

  user -->|"Uses<br/>HTTP 3000"| web
  web -->|"Mutations (oRPC)<br/>HTTP 3001 /db"| api
  web -->|"Syncs todos shape<br/>HTTP 3102 via /api/todos"| electric
  api -->|"Writes<br/>Kysely/SQL"| pg
  electric -->|"Replicates<br/>Logical replication"| pg
```

- Frontend application: TanStack Start (React), TanStack DB, Mantine UI.
- Database: PostgreSQL.
- Synchronization: Electric SQL.
- Backend API: Hono and oRPC.
- Development environment: Nix flake (using
  [services-flake](https://github.com/juspay/services-flake/) for quickly
  running a disposable database).

## No online demo yet

This application has no online demo yet, mostly because I don't want to maintain
an account for the database instance. Run it on your computer. With Nix, it's
relatively easy to set up.

Here is a screenshot:

![App screenshot](./docs/screenshot.png)

## Quick start with Nix

This repository contains a `flake.nix` for quickly starting a demo.
You will require the following dependencies:

- Nix (with flakes enabled)
- `docker` command available in PATH (used to run the ElectricSQL container)

1. Enter the dev shell and install deps:

```bash
nix develop
pnpm install
```

2. Create `.env` at the repository root. You can copy `.env.example`:

```bash
# `server.port` in `vite.config.ts`
VITE_APP_URL=http://localhost:3000
# `port` in `src/api/node-main.ts`
VITE_API_URL=http://localhost:3001
# `electricPort` in `nix/processes.nix`
VITE_ELECTRIC_URL=http://localhost:3102

# See `nix/processes.nix`
DATABASE_URL=postgresql://postgres:postgres@localhost:5437/todomvc?sslmode=disable
```

3. Start infrastructure (Postgres + Electric)

```bash
nix run .#services
```

Leave this running in one terminal.

4. Run DB migrations

```bash
pnpm dbmate:up
```

5. Run the app and API

- Terminal A: `pnpm dev` → http://localhost:3000
- Terminal B: `pnpm dev:api` → http://localhost:3001

## License

MIT. See [LICENSE](./LICENSE).
