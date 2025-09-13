{ inputs, ... }:
let
  # Configuration

  pgPort = 5437;

  electricPort = 3102;

  databaseName = "todomvc";
in
{
  imports = [
    inputs.process-compose-flake.flakeModule
  ];

  perSystem =
    {
      pkgs,
      lib,
      ...
    }:
    {
      process-compose.services = {
        imports = [
          inputs.services-flake.processComposeModules.default
        ];

        services.postgres."pg1" = {
          enable = true;

          package = pkgs.postgresql_16;

          settings = {
            wal_level = "logical";
          };

          port = pgPort;

          initialScript.before = ''
            CREATE ROLE postgres WITH SUPERUSER LOGIN PASSWORD 'postgres';
          '';

          initialScript.after = ''
            GRANT ALL PRIVILEGES ON DATABASE ${databaseName} TO postgres;
          '';

          initialDatabases = [
            {
              name = databaseName;
              schemas = [ ];
            }
          ];
        };

        settings.processes.electric = {
          command = ''
            podman run --replace --rm --network host \
              --name ${databaseName} \
              --env ELECTRIC_PORT=${builtins.toString electricPort} \
              --env ELECTRIC_INSECURE=true \
              --env 'DATABASE_URL=postgresql://postgres:postgres@localhost:${builtins.toString pgPort}/${databaseName}?sslmode=disable' \
              electricsql/electric:latest
          '';
          depends_on = {
            pg1-init.condition = "process_completed_successfully";
          };
        };
      };
    };
}
