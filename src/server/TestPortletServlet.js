import MdPortletServer from 'md-lib/server/MdPortletServer'
import log from './logger'

export default class TestPortletServer extends MdPortletServer {
  constructor(portletLocation) {
    super('testPortlet', portletLocation)

    // Expose method triggered via the message hub
    this.expose(::this.doSomeWork);
    // Expose long running job triggered via the message hub
    this.exposeJob(::this.doSomeWorkAsync)
    // Expose 'suicide' method which kills the server via message hub
    this.expose(::this.suicide);

    // Expose HTTP GET method triggered via proxy on md-server
    // Http methods are exposed with /api prefix, '/api/user-info' in this example
    // exposePost(..), exposePut(..) and exposeDelete(..) are also available
    this.exposeGet('/user-info', ::this.getUserInfo)
  }

  /* Example of sync call - see TestPortlet for how to call it */
  doSomeWork(context, param1, param2) {
    let userEmail = context.auth.email
    log.debug(`Doing some work for ${userEmail} ... ${param1}, ${param2}`);
    return `Response for ${context.auth.email}'s call: ${param1}:${param2} - ${new Date()}`;
  }

  /* Example of async call - see TestPortlet for how to call it */
  async doSomeWorkAsync(job, context, param1, param2) {
    let userEmail = context.auth.email
    log.debug(`Doing some long job ${userEmail} ... ${param1}, ${param2}; ${new Date()}`);
    for (let j = 1; j <= 10; j++) {
      job.progress('some progress ' + j)
      await sleep(100)
      if (1 === 0) {
        // if I want to report error
        job.error('There has been some error')
      }
    }
    job.done('job done');
  }

  /* Example of remotely exposed method which kills the server (or k8s pod) */
  suicide() {
    log.info(`${this.id} received suicide request. Exiting !!!`)
    setTimeout(process.exit, 0)
    return this.id + ' committing suicide';
  }

  /* Example - how to hook the portlet into REST api provided by the md-lib */
  /* Following method also illustrates how to obtain user details passed by the proxy */
  getUserInfo(req, res, next) {
    let userInfo = req.header('md-user')
    res.send(userInfo)
  }


}

var sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}
