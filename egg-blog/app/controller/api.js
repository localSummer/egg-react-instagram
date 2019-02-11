'use strict';
const Constroller = require('egg').Controller;

class ApiController extends Constroller {
  async index() {
    this.ctx.body = 'hi api';
  }
}

module.exports = ApiController;
