'use strict';
const Controller = require('egg').Controller;

class TopicController extends Controller {
  async addTopic() {
    const { ctx } = this;
    const { topicImg, topicTitle, address } = ctx.request.body;
    const userId = ctx.user.userId;
    const newTopic = {
      userId,
      topicImg: JSON.stringify(topicImg),
      topicTitle,
      address,
    };
    await ctx.service.topic.insertTopic(newTopic);
    ctx.returnBody(200, '发贴成功');
  }

  async topicDetail() {
    const { ctx } = this;
    const { topicId } = ctx.query;
    const topicDetailInfo = await ctx.service.topic.topicDetailHander(topicId);
    ctx.returnBody(200, '成功', topicDetailInfo);
  }

  async addDiscuss() {
    const { ctx } = this;
    const { topicId, replyContent } = ctx.request.body;
    const userId = ctx.user.userId;
    const user = await ctx.service.user.getUserByUserId(userId);
    const newDiscuss = {
      topicId,
      userId,
      replyName: user.username,
      replyContent,
    };
    const discuss = await ctx.service.topic.insertDiscuss(newDiscuss);
    if (discuss) {
      ctx.returnBody(200, '评论成功');
    } else {
      ctx.returnBody(400, '网络异常请稍后重试');
    }
  }

  async putLikeTopic() {
    const { ctx } = this;
    const { topicId, status } = ctx.request.body;
    const userId = ctx.user.userId;
    const topicLike = {
      topicId,
      userId,
      status,
    };
    const query = {
      topicId,
      userId,
    };
    // 未曾创建进行创建操作，否则进行更新
    await ctx.service.topic.putTopicLike(query, topicLike);
    ctx.returnBody(200, '更新成功', {
      status,
    });
  }

  async putCollectTopic() {
    const { ctx } = this;
    const { topicId, status } = ctx.request.body;
    const userId = ctx.user.userId;
    const topicCollect = {
      topicId,
      userId,
      status,
    };
    const query = {
      topicId,
      userId,
    };
    // 未曾创建进行创建操作，否则进行更新
    await ctx.service.topic.putTopicCollect(query, topicCollect);
    ctx.returnBody(200, '更新成功', {
      status,
    });
  }

  async friendsTopicList() {
    const { ctx, app } = this;
    const Op = app.Sequelize.Op;
    const userId = ctx.user.userId;
    const search = ctx.query.search || null;
    const follower = await ctx.service.follow.findFollow({
      followedId: userId,
      status: 1,
    });

    // 处理需要查询用户帖子的userId
    const followListUserIds = follower.map(item => item.userId);
    // 包含自己发布的贴子
    followListUserIds.push(userId);

    // 获取每个帖子详情、评论，发帖人信息
    const query = search ? {
      userId: {
        [Op.in]: followListUserIds,
      },
      topicTitle: {
        [Op.like]: search,
      },
    } : {
      userId: {
        [Op.in]: followListUserIds,
      },
    };
    const topics = await ctx.service.topic.queryTopicList(query);
    const topicList = [];
    for (const topic of topics) {
      const item = await ctx.service.topic.topicDetailHander(topic.topicId);
      topicList.push(item);
    }
    topicList && ctx.returnBody(200, '成功', topicList);
  }
}

module.exports = TopicController;
