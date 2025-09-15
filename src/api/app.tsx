import { OpenAPIHandler } from "@orpc/openapi/fetch"
import { Hono } from "hono"
import { logger } from "hono/logger"
import { apiImpl } from "./orpc"

const app = new Hono()

app.use(logger())

const handler = new OpenAPIHandler(apiImpl, {})

app.all("/db/*", async (c, next) => {
  const { matched, response } = await handler.handle(c.req.raw, {
    prefix: "/db",
  })

  if (matched) {
    return c.newResponse(response.body, response)
  }

  await next()
})

export default app
