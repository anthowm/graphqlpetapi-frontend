const packageJson = require('../../package.json');
export const environment = {
  production: true,
  i18nPrefix: '',
  appName: 'Angular pet api',
  envName: 'PROD',
  test: false,
  versions: {
    app: packageJson.version,
    angular: packageJson.dependencies['@angular/core'],
    ngrx: packageJson.dependencies['@ngrx/store'],
    material: packageJson.dependencies['@angular/material'],
    bootstrap: packageJson.dependencies.bootstrap,
    rxjs: packageJson.dependencies.rxjs,
    ngxtranslate: packageJson.dependencies['@ngx-translate/core'],
    fontAwesome: packageJson.dependencies['@fortawesome/fontawesome-free'],
    angularCli: packageJson.devDependencies['@angular/cli'],
    typescript: packageJson.devDependencies['typescript'],
    cypress: packageJson.devDependencies['cypress']
  },
  HOST: 'https://graphql-petapi.herokuapp.com',
  PORT: 4000,
  GRAPHQL_PATH: '/graphql'
};
