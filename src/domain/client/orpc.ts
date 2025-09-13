import type { ContractRouterClient } from "@orpc/contract"
import type { JsonifiedClient } from "@orpc/openapi-client"
import { createORPCClient } from "@orpc/client"
import { OpenAPILink } from "@orpc/openapi-client/fetch"
import { contract } from "../contract"
import { VITE_APP_URL } from "@/config"

const link = new OpenAPILink(contract, {
  url: `${VITE_APP_URL}/api/rpc`,
})

export const client: JsonifiedClient<ContractRouterClient<typeof contract>> = createORPCClient(link)
