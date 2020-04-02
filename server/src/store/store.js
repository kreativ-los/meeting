export class Store {
  constructor(isObject = true) {
    this.isObject = isObject;

    if (isObject) this.data = {};
    else this.data = [];
  }

  set(key, data) {
    if (this.isObject) this.data[key] = data;
    else this.data.push(key);
  }

  get(key) {
    return this.data[key];
  }

  delete(key) {
    if (this.isObject) delete this.data[key];
    else this.data.splice(this.data.indexOf(key), 1);
  }

  has(key) {
    if (this.isObject) return this.data.hasOwnProperty(key);
    else return this.data.includes(key);
  }

  shift() {
    return this.data.shift();
  }

  last() {
    return this.data[this.data.length - 1];
  }

  update(key, data) {
    if (Array.isArray(this.data[key])) {
      this.data[key].push(data);
    }
  }
}
