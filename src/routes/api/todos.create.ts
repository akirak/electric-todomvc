import { createServerFileRoute } from "@tanstack/react-start/server"
import { VITE_API_URL } from "@/config"

async function serve({ request }: { request: Request }) {
  const target = new URL("/db/todos/create", VITE_API_URL)

  const response = await fetch(target, {
    method: "POST",
    headers: {
      "content-type": request.headers.get("content-type") ?? "application/json",
      "accept": request.headers.get("accept") ?? "application/json",
    },
    body: await request.text(),
  })

  const headers = new Headers(response.headers)
  headers.delete("content-encoding")
  headers.delete("content-length")

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}

export const ServerRoute = createServerFileRoute("/api/todos/create").methods({
  POST: serve,
})
