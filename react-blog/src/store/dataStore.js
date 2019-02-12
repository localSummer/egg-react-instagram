import {observable, action} from 'mobx';

class DataStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable
  count = 1;

  @observable
  userInfo = null;

  @action
  changeCount(num) {
    this.count = num;
  }

  @action.bound
  saveUserInfo(userInfo) {
    this.userInfo = userInfo;
  }
}

export default DataStore;