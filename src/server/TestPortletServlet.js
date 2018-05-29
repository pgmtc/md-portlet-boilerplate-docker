import MdPortletServer from 'md-lib/server/MdPortletServer'
import log from './logger'

export default class TestPortletServer extends MdPortletServer {
  constructor(id, portletLocation) {
    super('test-portlet')
    this.expose(::this.doSomeWork);
    this.exposeJob(::this.doSomeWorkAsync)
    this.expose(::this.suicide);
    this.expose(::this.ping);
  }

  ping(param1) {
    log.debug('Running ping');
    return 'Pong for ' + param1;
  }

  doSomeWork(param1, param2) {
    log.debug(`Doing some work ... ${param1}, ${param2}`);
    return `Join: ${param1}:${param2} - ${new Date()}`;
  }


  async doSomeWorkAsync(job, param1, param2) {
    log.debug(`Doing some work ... ${param1}, ${param2}; ${new Date()}`);
    for (let j = 1; j <= 10; j++) {
      job.progress('some progress ' + j)
      await sleep(100)
    }
    job.done('job done');
  }

  suicide() {
    log.info(`${this.id} received suicide request. Exiting !!!`)
    setTimeout(process.exit, 0)
    return this.id + ' committing suicide';
  }
}

var sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}
