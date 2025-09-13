import { oc } from "@orpc/contract"
import { transactionSchema } from "./common"
import { newTodoSchema, updateTodoSchema } from "./todo"

export * from "./common"
export * from "./todo"

export const contract = {
  todos: {
    create: oc.input(newTodoSchema).output(transactionSchema),
    update: oc.input(updateTodoSchema).output(transactionSchema),
  },
}
