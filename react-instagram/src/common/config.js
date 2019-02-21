const env = 'dev';
let baseDomain = '';
let redirectUrl = '';

switch(env) {
  case 'dev':
    baseDomain = '/api/v2';
    redirectUrl = 'http://127.0.0.1:3000/#/'
    break;
  case 'prod':
    baseDomain = 'http://127.0.0.1:7001/api/v2';
    redirectUrl = 'http://127.0.0.1:7001/api/v2/#/';
    break;
  default:
    baseDomain = 'http://127.0.0.1:7001/api/v2';
    redirectUrl = 'http://127.0.0.1:7001/api/v2/#/';
}

export {
  baseDomain,
  redirectUrl,
};