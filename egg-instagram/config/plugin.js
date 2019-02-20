'use strict';

// had enabled by egg
// exports.static = true;
exports.nunjucks = {
  enabled: true,
  package: 'egg-view-nunjucks',
};

exports.routerPlus = {
  enabled: true,
  package: 'egg-router-plus',
};

exports.sequelize = {
  enabled: true,
  package: 'egg-sequelize',
};

exports.validatePlus = {
  enable: true,
  package: 'egg-validate-plus',
};

exports.passport = {
  enable: true,
  package: 'egg-passport',
};

exports.passportGithub = {
  enable: true,
  package: 'egg-passport-github',
};
