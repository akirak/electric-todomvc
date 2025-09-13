import {
  Button,
  Checkbox,
  Container,
  Divider,
  Group,
  Paper,
  SegmentedControl,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core"
import { eq, useLiveQuery } from "@tanstack/react-db"
import { ClientOnly, createFileRoute } from "@tanstack/react-router"
import { type } from "arktype"
import { useCallback, useState } from "react"
import { todosCollection } from "@/domain/client/electric"

const FilterSchema = type("'all' | 'active' | 'completed'")

type Filter = typeof FilterSchema.infer

const Search = type({
  "filter?": FilterSchema,
})

export const Route = createFileRoute("/")({
  component: TodoMVC,
  validateSearch: Search,
  loader: async () => {
    await todosCollection.preload()

    return null
  },
})

function TodoMVC() {
  return (
    <ClientOnly><TodoMVCClient /></ClientOnly>
  )
}

function TodoMVCClient() {
  const [title, setTitle] = useState("")
  const { filter } = Route.useSearch()
  const navigate = Route.useNavigate()

  const { data: todos, isLoading, isError, status } = useLiveQuery((q) => {
    const q0 = q.from({ todo: todosCollection })
    switch (filter ?? "all") {
      case "all": {
        return q0
      }
      case "active": {
        return q0.where(({ todo }) => eq(todo.completed, false))
      }
      case "completed": {
        return q0.where(({ todo }) => eq(todo.completed, true))
      }
    }
  }, [filter])

  const setFilter = useCallback((newFilter: Filter) => {
    navigate({
      search: {
        filter: newFilter,
      },
    })
  }, [navigate])

  if (isLoading) {
    return (
      <p>Loading...</p>
    )
  }

  if (isError)
    throw new Error(`Error ${status}`)

  const addTodo = () => {
    const t = title.trim()
    if (!t)
      return
    const id = (globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`)
    todosCollection.insert({ id, title: t, completed: false })
    setTitle("")
  }

  return (
    <Container size={560} p="md">
      <Stack gap="md">
        <Title order={2}>TodoMVC</Title>
        <Paper withBorder p="md" radius="md">
          <Stack gap="sm">
            <Group wrap="nowrap" align="center">
              <TextInput
                style={{ flex: 1 }}
                placeholder="What needs to be done?"
                value={title}
                onChange={e => setTitle(e.currentTarget.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter")
                    addTodo()
                }}
              />
              <Button onClick={addTodo} disabled={!title.trim()}>Add</Button>
            </Group>

            <Divider my="xs" />

            <Group justify="space-between">
              <SegmentedControl
                value={filter}
                onChange={v => setFilter(v as Filter)}
                data={[
                  { label: "All", value: "all" },
                  { label: "Active", value: "active" },
                  { label: "Completed", value: "completed" },
                ]}
              />
            </Group>
          </Stack>
        </Paper>

        <Stack gap="xs">
          {todos.map(todo => (
            <Paper key={todo.id} withBorder p="sm" radius="md">
              <Group justify="space-between">
                <Checkbox
                  checked={todo.completed}
                  onChange={e =>
                    todosCollection.update(todo.id, (draft) => {
                      draft.completed = e.currentTarget.checked
                    })}
                  label={(
                    <Text style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                      {todo.title}
                    </Text>
                  )}
                />
              </Group>
            </Paper>
          ))}
          {!isLoading && todos.length === 0 && (
            <Text c="dimmed" ta="center">No todos</Text>
          )}
        </Stack>
      </Stack>
    </Container>
  )
}
