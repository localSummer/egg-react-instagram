'use strict';
const Service = require('egg').Service;

class TopicService extends Service {
  async insertTopic(topic) {
    const { ctx } = this;
    return await ctx.model.Topic.create(topic);
  }

  async insertDiscuss(discuss) {
    const { ctx } = this;
    return ctx.model.Discuss.create(discuss);
  }

  async queryTopicDetail(query) {
    const { ctx } = this;
    return await ctx.model.Topic.findOne({
      where: query,
    });
  }

  async queryTopicCounts(query) {
    const { ctx } = this;
    return ctx.model.Topic.findAndCountAll({
      where: query,
      order: [[ 'created_at', 'DESC' ]],
    });
  }

  async topicDetailHander(topicId) {
    // const { ctx } = this;
    return await this.queryTopicDetail({
      topicId: +topicId,
    });
  }

  async queryDiscuss(query) {
    const { ctx } = this;
    return await ctx.model.Discuss.findAll({
      where: query,
    });
  }

  async queryTopicLike(query) {
    const { ctx } = this;
    return await ctx.model.TopicLike.findOne({
      where: query,
    });
  }

  async queryTopicLikeCounts(query) {
    const { ctx } = this;
    return await ctx.model.TopicLike.findAndCountAll({
      where: query,
    });
  }

  // 创建或更新点赞状态
  async putTopicLike(query, topicLike) {
    const { ctx } = this;
    const result = await this.queryTopicLike(query);

    return (result ? await ctx.model.TopicLike.update(topicLike, {
      where: query,
    }) : await ctx.model.TopicLike.create(topicLike));
  }
}

module.exports = TopicService;
