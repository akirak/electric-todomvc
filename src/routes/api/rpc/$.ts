import { OpenAPIHandler } from "@orpc/openapi/fetch"
import { createServerFileRoute } from "@tanstack/react-start/server"
import { apiImpl } from "@/domain/server/impl"
// import { CORSPlugin } from '@orpc/server/plugins'
// import { toIncomingHeaders } from "@/utils/http"

const handler = new OpenAPIHandler(apiImpl, {
  // Allow all origins in dev; adjust for prod as needed
  // plugins: [new CORSPlugin()],
})

async function serve({ request }: { request: Request }) {
  const { matched, response } = await handler.handle(request, {
    prefix: "/api/rpc",
  })

  if (matched) {
    return response
  }

  return new Response("Not Found", { status: 404 })
}

export const ServerRoute = createServerFileRoute("/api/rpc/$").methods({
  GET: serve,
  OPTION: serve,
  POST: serve,
})
