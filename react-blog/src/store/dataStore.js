import {observable, action} from 'mobx';

class DataStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable
  count = 1;

  @observable
  userInfo = null;

  @observable
  personalInfo = null;

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