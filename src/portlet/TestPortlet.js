import {MdPortlet} from 'md-lib'

export default class TimePortlet extends MdPortlet {
  createChildren (createElement) {
    this.contentElement = createElement('div')
    this.timerElement = document.createElement('div')
    this.contentElement.appendChild(this.timerElement)
  }

  loaded () {
    setInterval(this.loadData.bind(this), 1000)
    this.loadData()
  }

  async loadData () {
    var data = await this.httpGet('/data')
    this.timerElement.innerHTML = data
  }
}
