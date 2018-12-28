import {observable, action} from 'mobx';

class Store {
  @observable
  count = 1;

  @action
  changeCount(num) {
    this.count = num;
  }
}

export default new Store();