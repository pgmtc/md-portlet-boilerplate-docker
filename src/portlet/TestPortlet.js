import {MdPortlet} from 'md-lib'

export default class TimePortlet extends MdPortlet {
  createChildren (createElement) {
    this.contentElement = createElement('div')
    this.timerElement = document.createElement('div')
    this.contentElement.appendChild(this.timerElement)
  }

  loaded () {
    this.loadData()
  }

  async loadData () {
    this.timerElement.innerHTML = await this.httpGet('/data')
  }
}
