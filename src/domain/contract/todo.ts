import type {
  Insertable,
} from "kysely"
import type { Assert, SimpleEqual2 } from "@/utils/type-assert"
import { scope, type } from "arktype"

export const todoSchema = type({ id: "string > 0", title: "string > 0", completed: "boolean" })

export type TodoTable = typeof todoSchema.infer

const s = scope({
  Todo: todoSchema,
})

// creating a new todo

export const newTodoSchema = todoSchema

export type NewTodo = Insertable<TodoTable>

type _T1 = Assert<SimpleEqual2<typeof newTodoSchema.infer, NewTodo>>

// updating a new todo

export const updateTodoSchema = s.type("Partial<Omit<Todo, 'id'>> & Pick<Todo, 'id'>")
