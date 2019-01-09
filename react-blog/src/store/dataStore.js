import {observable, action} from 'mobx';

class DataStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable
  count = 1;

  @action
  changeCount(num) {
    this.count = num;
  }
}

export default DataStore;