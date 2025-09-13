import type { IncomingHttpHeaders } from "node:http"

export function toIncomingHeaders(headers: Headers): IncomingHttpHeaders {
  const out: IncomingHttpHeaders = {}
  headers.forEach((value, key) => {
    out[key] = value
  })
  return out
}
