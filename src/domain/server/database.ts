import { VITE_DATABASE_URL } from "@/config"
import type { TodoTable } from "../contract"
import {
  Kysely,
  PostgresDialect,
} from "kysely"
import { Pool } from "pg"

interface Database {
  todos: TodoTable
}

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: VITE_DATABASE_URL,
    max: 10,
  }),
})

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<Database>({
  dialect,
  log: ["query", "error"],
})
