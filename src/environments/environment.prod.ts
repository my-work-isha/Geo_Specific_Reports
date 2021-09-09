// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  app_env: "prod",
  bGroup_admin: "Comp-IAdministrators,Comp-IAdministratorNoDelete",
  bGroup_nonIAI: "Comp-IBPCComplianceAnalyst",
  bGroup_readers: "Comp-ITCOBPCMgmtIAIReaders,Comp-IBPCComplianceAnalyst",
  bGroup_editors: "Comp-IAdministrators,Comp-IAdministratorNoDelete",
  bGroup_genInq: "Comp-ILimitedReadersforVetting",
  bGroup_delete: "Comp-IAdministrators"
};
