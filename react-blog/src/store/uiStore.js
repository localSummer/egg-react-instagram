import {observable, action} from 'mobx';

class UiStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable
  show = false;

  @action
  changeShow() {
    this.show = !this.show;
  }
}

export default UiStore;