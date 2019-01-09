import UiStore from './uiStore';
import DataStore from './dataStore';

class RootStore {
  constructor() {
    this.uiStore = new UiStore(this);
    this.dataStore = new DataStore(this);
  }
}

export default new RootStore();