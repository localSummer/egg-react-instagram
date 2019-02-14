import {observable, action} from 'mobx';

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
}

export default DataStore;