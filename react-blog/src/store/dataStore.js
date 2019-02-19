import {
  observable,
  action
} from 'mobx';

class DataStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable
  count = 1;

  @observable
  userInfo = {
    avatarUrl: '',
    username: null,
    account: '',
    abstract: false,
    email: '',
    userId: '',
  };

  @observable
  personalInfo = {
    topic: {
      counts: 0,
      topicList: []
    },
    fansCounts: 0,
    followCounts: 0,
  };

  @observable
  topicList = [{
    userInfo: {
      avatar: 'https://s10.mogucdn.com/mlcdn/c45406/180930_634a7ck1ikea6k139lbgbi343ha2c_150x150.jpg',
      username: '',
      abstract: false
    },
    topic: {
      topicImgList: [],
      createdAt: '',
      topicLike: false,
      topicLikeCounts: 0 // 点赞数
    },
    discuss: []
  }];

  @action
  changeCount(num) {
    this.count = num;
  }

  @action.bound
  saveUserInfo(userInfo) {
    this.userInfo = userInfo;
  }

  @action.bound
  savePersonalInfo(personalInfo) {
    this.personalInfo = personalInfo;
  }

  @action.bound
  saveTopicList(topicInfo) {
    this.topicList = topicInfo;
  }

  @action.bound
  addTopicComment(commentInfo) {
    const { index, replyContent, replyName } = commentInfo;
    let sourceComment = {
      replyName,
      replyContent
    };
    this.topicList[index].discuss.push(sourceComment);
  }
  
  @action.bound
  handleTopicLike(topicLikeInfo) {
    console.log('topicLikeInfo: ', topicLikeInfo);
    const { index, topicLikeCounts, topicLike } = topicLikeInfo;
    let targetTopic = this.topicList[index].topic;
    targetTopic.topicLike = topicLike;
    targetTopic.topicLikeCounts = topicLikeCounts;
  }
}

export default DataStore;