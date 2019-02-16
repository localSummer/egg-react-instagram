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
    const { ctx } = this;
    // 查询贴子详情
    let topic = await this.queryTopicDetail({
      topicId: +topicId,
    });
    const userId = topic.userId;
    const user = await ctx.service.user.getUserByUserId(userId);
    // 查询贴子全部评论
    const discuss = await this.queryDiscuss({
      topicId: +topicId,
    });
    // 查询当前登录用户是否已点赞
    const topicLike = await this.queryTopicLike({
      topicId: +topicId,
      userId: ctx.user.userId,
      status: 1,
    });
    // 查询点赞数量
    const topicLikeCounts = await this.queryTopicLikeCounts({
      topicId: +topicId,
      status: 1,
    });
    // 处理贴子的评论信息
    const disscussList = discuss.map(item => {
      return {
        replyName: item.replyName,
        replyContent: item.replyContent,
        userId: item.userId,
      };
    });
    // 返回贴子的详情
    const topicDetail = {
      userInfo: {
        username: user.username,
        avatarUrl: user.avatarUrl,
        userId: user.userId,
      },
      topic: {
        topicImgList: JSON.parse(topic.topicImg),
        created_at: topic.created_at,
        topicId,
        topicLike: !!topicLike,
        topicLikeCounts: topicLikeCounts.count,
      },
      discuss: disscussList,
    };
    return topicDetail || {};
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
