import NATS from 'nats'
import log from './logger'
export default class MdMessaging {
  constructor(id) {
    this.id = id
  }

  connect(location) {
    this.location = location;
    this.nats = NATS.connect(location)
    log.info('Connected to NATS');
  }

  disconnect() {
    this.nats.close();
    log.info('Disconnected from NATS');
  }
}
