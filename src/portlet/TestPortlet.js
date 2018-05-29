import MdPortlet from 'md-lib/lib/MdPortlet'
import el from './el'

export default class TimePortlet extends MdPortlet {
  createChildren (createElement) {
    this.contentElement = createElement('div')

    this.contentElement.appendChild(el.cr('button').txt('Call API').onClick(this.callApi.bind(this)).getElement())
    this.contentElement.appendChild(el.cr('button').txt('Call Job').onClick(this.callJob.bind(this)).getElement())
    this.contentElement.appendChild(el.cr('button').txt('Call Http').onClick(this.callHttp.bind(this)).getElement())
    this.contentElement.appendChild(el.cr('button').txt('Broadcast (HTTP)').onClick(this.callHttpBroadcast.bind(this)).getElement())
    this.contentElement.appendChild(el.cr('button').txt('Broadcast (Ws)').onClick(this.callBroadcast.bind(this)).getElement())
    this.contentElement.appendChild(el.cr('button').txt('Emit (Ws').onClick(this.callEmit.bind(this)).getElement())

    this.timerElement = el.cr('div').getElement();
    this.contentElement.appendChild(this.timerElement);

  }

  loaded () {
    //this.loadData()
    this.getSocket().on('response', this.wsTestMessageHandler.bind(this));
  }

  wsTestMessageHandler(msg) {
    this.timerElement.innerText = msg
  }

  async callApi () {
    var res = await this.api('doSomeWork', [123, 'abc'])
    this.timerElement.innerText = res;
  }

  async callJob () {
    var res = await this.job('doSomeWorkAsync', [456, 789], (msg) => {
      this.timerElement.innerText = 'Message from doSomeWorkAsync: ' + msg
    })
    this.timerElement.innerText = 'done: ' + res;
  }

  async callHttp () {
    this.timerElement.innerHTML = await this.httpGet('data')
  }

  async callEmit() {
    this.emit('message', 'Client Message ' + new Date());
  }

  async callHttpBroadcast() {
    this.httpBroadcast('response', 'HTTP Broadcast Message ' + new Date());
  }

  async callBroadcast() {
    this.broadcast('broadcast', 'WS Broadcast Message ' + new Date());
  }

}
