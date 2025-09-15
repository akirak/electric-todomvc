import { electricCollectionOptions } from "@tanstack/electric-db-collection"
import { createCollection } from "@tanstack/react-db"
import { VITE_APP_URL } from "@/config"
import { todoSchema } from "../contract"
import { client } from "./orpc"

export const todosCollection = createCollection(
  electricCollectionOptions({
    id: "todos",
    schema: todoSchema,
    getKey: item => item.id,

    shapeOptions: {
      url: `${VITE_APP_URL}/api/todos`,
      params: { table: "todos" },
    },

    onInsert: async ({ transaction }) => {
      const newItem = transaction.mutations[0].modified
      const { txid } = await client.todos.create(newItem)
      return { txid }
    },

    onUpdate: async ({ transaction }) => {
      const { original, changes } = transaction.mutations[0]
      const { txid } = await client.todos.update({ id: original.id, ...changes })
      return { txid }
    },
  }),
)
