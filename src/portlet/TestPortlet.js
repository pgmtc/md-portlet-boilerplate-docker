import MdPortlet from 'md-lib/client/MdPortlet'
import el from './el'

export default class TestPortlet extends MdPortlet {
  constructor() {
    super('testPortlet') // This must match id in the server part
  }
  createChildren (createElement) {
    this.contentElement = createElement('div')

    var btnApi = el.cr('button').txt('Call API').onClick(this.callApi.bind(this)).getElement()
    var btnJob = el.cr('button').txt('Call Job').onClick(this.callJob.bind(this)).getElement()
    var btnBroadcastHttp = el.cr('button').txt('Broadcast').onClick(this.callBroadcast.bind(this)).getElement()

    this.contentElement.appendChild(btnApi)
    this.contentElement.appendChild(btnJob)
    this.contentElement.appendChild(btnBroadcastHttp)

    this.timerElement = el.cr('div').getElement();
    this.contentElement.appendChild(this.timerElement);

  }

  loaded () {
    this.wsOn('broadcastResponse', this.broadcastMessageHandler.bind(this));
    this.onRefresh(this.callJob.bind(this))

  }

  broadcastMessageHandler(msg) {
    let from = msg.context.auth.email
    this.timerElement.innerHTML = `from ${from}: ${msg.message}<BR>` + this.timerElement.innerHTML
  }

  async callApi () {
    var res = await this.apiCall('doSomeWork', [123, 'abc'])
    this.timerElement.innerText = res;
  }

  async callJob () {
    try {
      var res = await this.apiJob('doSomeWorkAsync', [456, 789], (msg) => {
        this.timerElement.innerText = 'Message from doSomeWorkAsync: ' + msg
      })
      this.timerElement.innerText = 'done: ' + res;
    } catch (err) {
      this.timerElement.innerText = 'Error: ' + err
    }
  }

  async callBroadcast() {
    this.broadcast('broadcastResponse','Hey there');
  }

}
