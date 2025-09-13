import type { ErrorComponentProps } from "@tanstack/react-router"
import { Button } from "@mantine/core"
import {
  ErrorComponent,
  Link,
  rootRouteId,
  useMatch,
  useRouter,
} from "@tanstack/react-router"

export function DefaultCatchBoundary({ error }: ErrorComponentProps) {
  const router = useRouter()
  const isRoot = useMatch({
    strict: false,
    select: state => state.id === rootRouteId,
  })

  console.error("DefaultCatchBoundary Error:", error)

  return (
    <div>
      <ErrorComponent error={error} />
      <div>
        <Button
          onClick={() => {
            router.invalidate()
          }}
        >
          Try Again
        </Button>
        {isRoot
          ? (
              <Link
                to="/"
              >
                Home
              </Link>
            )
          : (
              <Link
                to="/"
                onClick={(e) => {
                  e.preventDefault()
                  window.history.back()
                }}
              >
                Go Back
              </Link>
            )}
      </div>
    </div>
  )
}
