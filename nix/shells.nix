{
  perSystem =
    {
      pkgs,
      ...
    }:
    {
      devShells = {
        default = pkgs.mkShell {
          packages = [
            pkgs.nodejs
            pkgs.corepack
            pkgs.nodePackages.typescript-language-server
          ];
        };
      };
    };
}
