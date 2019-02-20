'use strict';
const Controller = require('egg').Controller;

class NewsController extends Controller {
  async list() {
    const dataList = [
      { id: '1', title: 'this is news 1', url: '/news/1' },
      { id: '2', title: 'this is news 2', url: '/news/2' },
    ];
    await this.ctx.render('news/list.tpl', { list: dataList });
  }

  async item() {
    const { id = 1 } = this.ctx.params;
    await this.ctx.render('news/item.tpl', { id });
  }
}

module.exports = NewsController;
