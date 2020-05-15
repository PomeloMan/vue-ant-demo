export class Storage {

  storage;

  constructor(storage = localStorage) {
    this.storage = storage;
  }

  setItem(key, val, withBase64 = false) {
    let _val = val
    if (val instanceof Object) {
      _val = JSON.stringify(val)
    }

    if (withBase64) {
      _val = btoa(encodeURI(_val))
    }
    this.storage.setItem(key, _val)
  }

  getItem(key, withBase64 = false) {
    let val = this.storage.getItem(key)
    if (val) {
      if (withBase64) {
        val = decodeURI(atob(val))
      }
      val = JSON.parse(val)
      return val
    }
    return {}
  }
}

export const storage = new Storage()
