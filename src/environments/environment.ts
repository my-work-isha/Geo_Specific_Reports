// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  app_env: "dev",
  bGroup_admin: "dev-bpc-apps_admin,dev-bpcopscompi_editors",
  bGroup_nonIAI: "dev-bpcopscompi_nonIAI",
  bGroup_readers: "dev-bpcopscompi_access,dev-bpcopscompi_nonIAI",
  bGroup_editors: "dev-bpc-apps_admin,dev-bpcopscompi_editors",
  bGroup_genInq: "dev-bpcopscompi_genInq",
  bGroup_delete: "dev-bpc-apps_admin"
};
