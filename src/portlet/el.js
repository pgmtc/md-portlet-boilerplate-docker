export default class El {
  static cr(tagName) {
    let el = new El();
    el.domEl = document.createElement(tagName);
    return el;
  }

  cls(className) {
    this.domEl.className = className;
    return this;
  }

  txt(content) {
    this.domEl.innerText = content;
    return this;
  }

  onClick(handler) {
    this.domEl.addEventListener('click', handler);
    return this;
  }

  getElement() {
    return this.domEl;
  }

}
