const env = 'dev';
let baseDomain = '';

switch(env) {
  case 'dev':
    baseDomain = '';
    break;
  case 'prod':
    baseDomain = 'http://127.0.0.1:7001/api/v2';
    break;
  default:
    baseDomain = 'http://127.0.0.1:7001/api/v2';
}

export default baseDomain;