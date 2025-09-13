/// <reference types="vite/client" />

interface ViteTypeOptions {
  // By adding this line, you can make the type of ImportMetaEnv strict
  // to disallow unknown keys.
  // strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  readonly VITE_APP_URL: string
  readonly VITE_DATABASE_URL: string
  readonly VITE_ELECTRIC_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
