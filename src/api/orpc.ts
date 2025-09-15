import { implement } from "@orpc/server"
import { sql } from "kysely"
import { contract } from "@/domain/contract"
import { db } from "./database"

const os = implement(contract)

export const createTodo = os.todos.create
  .handler(async ({ input }) => {
    const row = await db.insertInto("todos").values(input).returning([
      sql`xmin`.as("txid"),
    ]).executeTakeFirstOrThrow()
    return {
      txid: Number(row.txid),
    }
  })

export const updateTodo = os.todos.update
  .handler(async ({ input: { id, ...changes } }) => {
    const row = await db.updateTable("todos").set(changes).where("id", "=", id).returning([
      sql`xmin`.as("txid"),
    ]).executeTakeFirstOrThrow()
    return {
      txid: Number(row.txid),
    }
  })

export const apiImpl = os.router({
  todos: {
    create: createTodo,
    update: updateTodo,
  },
})
