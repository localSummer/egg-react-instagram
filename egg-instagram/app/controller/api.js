'use strict';
const Constroller = require('egg').Controller;

class ApiController extends Constroller {
  async index() {
    this.ctx.body = {
      flag: true,
      message: 'hi api',
      data: null,
    };
  }
}

module.exports = ApiController;
