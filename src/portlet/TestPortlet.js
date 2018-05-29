import MdPortlet from 'md-lib/client/MdPortlet'
import el from './el'

export default class TimePortlet extends MdPortlet {
  constructor() {
    super('testPortlet') // This must match id in the server part
  }
  createChildren (createElement) {
    this.contentElement = createElement('div')

    var btnApi = el.cr('button').txt('Call API').onClick(this.callApi.bind(this)).getElement()
    var btnJob = el.cr('button').txt('Call Job').onClick(this.callJob.bind(this)).getElement()
    var btnBroadcastHttp = el.cr('button').txt('Broadcast (HTTP)').onClick(this.callHttpBroadcast.bind(this)).getElement()
    var btnBroadcastWs = el.cr('button').txt('Broadcast (Ws)').onClick(this.callBroadcast.bind(this)).getElement()
    var btnEmit = el.cr('button').txt('Emit (Ws').onClick(this.callEmit.bind(this)).getElement()

    this.contentElement.appendChild(btnApi)
    this.contentElement.appendChild(btnJob)
    this.contentElement.appendChild(btnBroadcastHttp)
    this.contentElement.appendChild(btnBroadcastWs)
    this.contentElement.appendChild(btnEmit)

    this.timerElement = el.cr('div').getElement();
    this.contentElement.appendChild(this.timerElement);

  }

  loaded () {
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
    try {
      var res = await this.job('doSomeWorkAsync', [456, 789], (msg) => {
        this.timerElement.innerText = 'Message from doSomeWorkAsync: ' + msg
      })
      this.timerElement.innerText = 'done: ' + res;
    } catch (err) {
      this.timerElement.innerText = 'Error: ' + err
    }
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
