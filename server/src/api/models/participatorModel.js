import {Store} from '../../store/store';

class ParticipatorStore extends Store {
  constructor() {
    super(false);
  }

  toArray() {
    const array = [];

    this.data.forEach((el) => {
      array.push(el.get('name'));
    });

    return array;
  }

  count() {
    return this.data.length;
  }

  has(key) {
    this.data.forEach((el) => {
      if (key === el.get('name')) return true;
    });

    return false;
  }
}

export default ParticipatorStore;
