import logger from './logger'
import MdMessaging from './MdMessaging'
const natsServerLocation = process.env.NATS || undefined

export default class MdPortletServer {
  constructor(id) {
    this.id = id
    this.msgHub = new MdMessaging(this.id)
    this.msgHub.connect(natsServerLocation);
  }

  destructor() {
    this.msgHub.disconnect()
    process.exit(1);
  }

}
