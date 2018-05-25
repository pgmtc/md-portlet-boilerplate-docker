import MdPortletServer from "./MdPortletServer"
import log from './logger'

export default class TestPortletServer extends MdPortletServer {
  constructor() {
    super('testportlet')
    this.expose(::this.doSomeWork);

    // this.invoke('mdesktop.testportlet.doSomeWork', 'param1', 'param2');
    this.invocations = 0;

  }

  doSomeWork(param1, param2) {
    this.invocations++;
    log.debug(`Doing some work ... ${param1}, ${param2}; total invocations = ${this.invocations}`);
    return `Join: ${param1}:${param2}`;
  }

}
