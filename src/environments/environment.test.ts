// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=test` then `environment.test.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  app_env: "test",
  bGroup_admin: "test-bpcopscompi_admin,test-bpcopscompi_editors",
  bGroup_nonIAI: "test-bpcopscompi_nonIAI",
  bGroup_readers: "test-bpcopscompi_access,test-bpcopscompi_nonIAI",
  bGroup_editors: "test-bpcopscompi_admin,test-bpcopscompi_editors",
  bGroup_genInq: "test-bpcopscompi_genInq",
  bGroup_delete: "test-bpcopscompi_admin"
};
